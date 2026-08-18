/**
 * services/contentCache.js
 *
 * This site is a **cache of hcs-app's content database**, not a client of it.
 *
 * hcs-app owns the content and serves it at /api/web/content; this module pulls
 * that payload, writes it to disk, and every page renders from the local copy.
 * With hcs-app switched off — a redeploy, a broken tunnel, the whole box down —
 * heroncs.co.uk keeps serving its last known good copy and visitors notice
 * nothing. That is the whole basis for pulling content over a network at all,
 * so nothing here may make rendering depend on a request succeeding.
 *
 * Three levels, in this order:
 *
 *   1. the disk mirror   (data/content.json, written by the last good pull)
 *   2. a live pull       (refreshes the mirror, on a timer and on /revalidate)
 *   3. the seed data     (the arrays in services/*Data.js — the floor)
 *
 * The seed files are kept, never deleted. On a fresh checkout with no mirror
 * and no reachable API, the site still renders the content it shipped with.
 *
 * **The snapshot is synchronous on purpose.** getSite() runs inside
 * getBaseViewModel() on every page render; making the getters async would
 * change every controller, service and view signature in the project. The
 * network work happens on a timer, never in a request.
 *
 * ## Things specific to this host
 *
 * - **Passenger runs several worker processes.** Each holds its own snapshot
 *   and its own timer, and /revalidate only ever reaches one of them. The disk
 *   mirror is what the others converge on, on their next tick — so the mirror
 *   is load-bearing, not just a fallback.
 * - **The document root is the app root**, so anything written here is served
 *   off disk by LiteSpeed before Passenger sees the request. The mirror holds
 *   public website copy so nothing leaks, but it should not be reachable by
 *   accident: keep the `.htaccess` source rules in place. Mirrored images are
 *   written under public/images/managed/ deliberately — there they are served
 *   as ordinary static assets, which is faster than proxying them.
 * - **Everything written must stay gitignored.** The app root is also the git
 *   working tree on the server, and a dirty tree breaks the next deploy pull.
 */

const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const API_URL = process.env.CONTENT_API_URL || '';
const API_TOKEN = process.env.CONTENT_API_TOKEN || '';
const REFRESH_MS = Math.max(30, parseInt(process.env.CONTENT_REFRESH_SECONDS, 10) || 120) * 1000;
const TIMEOUT_MS = 10000;

const DATA_DIR = path.join(__dirname, '..', 'data');
const MIRROR_FILE = path.join(DATA_DIR, 'content.json');
// Under public/ so LiteSpeed serves these directly, like any other asset.
const MEDIA_DIR = path.join(__dirname, '..', 'public', 'images', 'managed');
const MEDIA_URL_BASE = '/images/managed';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let snapshot = null;      // the payload currently being served, or null
let source = 'seed';      // 'mirror' | 'live' | 'seed' — reported by /version
let fetchedAt = null;     // when the payload was written by whoever wrote it
let etag = null;          // for If-None-Match on the next poll
let timer = null;

// ---------------------------------------------------------------------------
// Disk mirror
// ---------------------------------------------------------------------------

function loadMirrorSync() {
  try {
    const raw = fs.readFileSync(MIRROR_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.payload) return false;
    snapshot = parsed.payload;
    etag = parsed.etag || null;
    fetchedAt = parsed.fetchedAt || null;
    source = 'mirror';
    return true;
  } catch {
    // No mirror yet, or an unreadable one. Either way the seed data covers it.
    return false;
  }
}

async function writeMirror(payload, newEtag) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const body = JSON.stringify({ fetchedAt: new Date().toISOString(), etag: newEtag, payload });
  // Write-then-rename: a worker reading the mirror while another writes it must
  // never see half a file. Same reason css:deploy builds to a temp name.
  const tmp = `${MIRROR_FILE}.tmp`;
  await fsp.writeFile(tmp, body, 'utf8');
  await fsp.rename(tmp, MIRROR_FILE);
}

// ---------------------------------------------------------------------------
// Media mirroring
// ---------------------------------------------------------------------------

/** Local URL for a media uuid. Stable, so it can be cached hard by the browser. */
function mediaUrl(item) {
  return `${MEDIA_URL_BASE}/${item.uuid}-${item.filename}`;
}

function mediaFile(item) {
  return path.join(MEDIA_DIR, `${item.uuid}-${item.filename}`);
}

/**
 * Downloads any image in the manifest this host does not already hold.
 *
 * Filenames carry the uuid, and hcs-app never rewrites an image in place — a
 * re-upload is a new record with a new uuid — so a file that exists is current
 * by definition and is never re-fetched.
 *
 * A failure here is logged and skipped rather than aborting the pull: one
 * missing photograph should not cost the site a content update.
 */
async function mirrorMedia(manifest) {
  if (!Array.isArray(manifest) || !manifest.length) return;
  await fsp.mkdir(MEDIA_DIR, { recursive: true });

  for (const item of manifest) {
    const file = mediaFile(item);
    try {
      if (fs.existsSync(file)) continue;
      const res = await request(`${API_URL.replace(/\/content$/, '')}/media/${item.uuid}`);
      if (!res.ok) {
        console.warn(`[contentCache] media ${item.filename} returned ${res.status}`);
        continue;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      const tmp = `${file}.tmp`;
      await fsp.writeFile(tmp, buf);
      await fsp.rename(tmp, file);
    } catch (err) {
      console.warn(`[contentCache] could not mirror ${item.filename}: ${err.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Pulling
// ---------------------------------------------------------------------------

function request(url, headers = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  return fetch(url, {
    headers: { Authorization: `Bearer ${API_TOKEN}`, ...headers },
    signal: controller.signal,
  }).finally(() => clearTimeout(t));
}

/**
 * Pulls once. Returns true when the snapshot changed.
 *
 * Never throws: an unreachable or erroring API leaves the current snapshot
 * exactly as it was, which is the behaviour the whole design rests on.
 */
async function refresh(reason = 'poll') {
  if (!API_URL || !API_TOKEN) return false;

  try {
    const res = await request(API_URL, etag ? { 'If-None-Match': etag } : {});

    if (res.status === 304) {
      source = 'live';
      return false;
    }
    if (!res.ok) {
      console.warn(`[contentCache] ${reason}: API returned ${res.status}`);
      return false;
    }

    const payload = await res.json();
    const newEtag = res.headers.get('etag');

    // Media first: a page must never render a reference to an image this host
    // has not finished downloading.
    await mirrorMedia(payload.media);

    snapshot = payload;
    etag = newEtag;
    fetchedAt = new Date().toISOString();
    source = 'live';
    await writeMirror(payload, newEtag);
    console.log(`[contentCache] ${reason}: updated from hcs-app`);
    return true;
  } catch (err) {
    console.warn(`[contentCache] ${reason}: ${err.message} — serving the existing copy`);
    return false;
  }
}

/**
 * Loads the mirror and starts the poll. Call once at startup.
 *
 * The first pull is deliberately not awaited: the site must start serving
 * immediately from the mirror (or the seed data) whether or not hcs-app is
 * reachable, and a slow or hanging API must not delay boot.
 */
function start() {
  loadMirrorSync();

  if (!API_URL || !API_TOKEN) {
    console.log('[contentCache] CONTENT_API_URL/TOKEN not set — serving built-in content');
    return;
  }

  refresh('startup');
  if (!timer) {
    timer = setInterval(() => refresh('poll'), REFRESH_MS);
    // Do not hold the process open for the poll alone.
    if (timer.unref) timer.unref();
  }
}

// ---------------------------------------------------------------------------
// Reading — synchronous, called on every render
// ---------------------------------------------------------------------------

/**
 * A section of the payload, or null when there is nothing cached for it.
 *
 * The *Data.js modules call this and fall back to their own constants on null,
 * which is what makes the seed data the floor rather than dead code.
 */
function get(key) {
  if (!snapshot) return null;
  const value = snapshot[key];
  if (value === undefined || value === null) return null;
  if (Array.isArray(value) && value.length === 0) return null;
  return value;
}

/**
 * Rewrites a { media, alt } reference into a local URL.
 *
 * Returns null when the image was never mirrored, so callers can render a text
 * panel rather than a broken image — which is what the site already does for a
 * case study with no usable photograph.
 */
function imageUrl(ref) {
  if (!ref || !ref.media || !snapshot) return null;
  const item = (snapshot.media || []).find((m) => m.uuid === ref.media);
  if (!item) return null;
  return mediaUrl(item);
}

/** What /version reports: which level answered, and how old it is. */
function status() {
  return {
    source,
    fetchedAt,
    configured: Boolean(API_URL && API_TOKEN),
    counts: snapshot
      ? {
        studies: (snapshot.studies || []).length,
        posts: (snapshot.posts || []).length,
        services: (snapshot.services || []).length,
        accreditations: (snapshot.accreditations || []).length,
        media: (snapshot.media || []).length,
      }
      : null,
  };
}

module.exports = { start, refresh, get, imageUrl, status };
