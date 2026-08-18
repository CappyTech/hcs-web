# Changelog

All notable changes to hcs-web will be documented here. Format follows [Keep a Changelog](https://keepachangelog.com/). Versioning follows [Semantic Versioning](https://semver.org/).

This file starts at 1.1.0. There is no CI on this repo and `package.json`'s version sat at 1.0.0 from the repo's creation, so for everything before this point git is the source of truth. `/version` reports the running version alongside the deployed short SHA, which is the more reliable of the two.

## [1.1.0] - 2026-08-18

[#7](https://github.com/CappyTech/hcs-web/pull/7) · pairs with [hcs-app#79](https://github.com/CappyTech/hcs-app/pull/79)

### Added
- **Content is pulled from hcs-app and cached to disk.** Case studies, blog posts, services, accreditations and the site's own identity are now authored in hcs-app at `/website`. Every content file here carries the same comment — *"Swap this in-memory array for a DB/CMS later without touching the service, controller, or views."* — and until now a copy change meant a developer, a commit, and a manual **Update from Remote → Deploy HEAD Commit** in cPanel.

  **This site is a cache of that database, not a client of it.** `services/contentCache.js` pulls on a timer, mirrors the payload and its images to disk, and every page renders from the local copy. With hcs-app switched off — a redeploy, a broken tunnel, the whole box down — this site keeps serving its last known good copy and visitors notice nothing. That is the basis for pulling content over a network at all, so **nothing here may make rendering depend on a request succeeding.**

  Three levels, in order: **the disk mirror** (`data/content.json` and `public/images/managed/`), **a live pull**, and **the seed data** — the arrays still in `services/*Data.js`.

- **`POST /revalidate`**, called by hcs-app on publish so a change appears in seconds rather than at the next poll. Authorised by `CONTENT_REVALIDATE_SECRET`; unset, it answers 503 rather than accepting anonymous calls.

- **`GET /version` now reports which of the three levels answered and how stale the mirror is.** With no CI and no monitoring on this app, it is the only place a site quietly serving a month-old copy would show up.

### Changed
- The five `services/*Data.js` getters read the cached snapshot and fall back to their own constants. **No controller, service or view signature changes** — each getter translates the cached payload back into the shape the views already read.

### Notes
Four things worth knowing before touching this next.

- **The seed arrays are deliberately not deleted.** They are the floor a fresh checkout with no mirror and no reachable API renders from, and they are the shape the views read.
- **The snapshot is synchronous, and has to be.** `getSite()` runs inside `getBaseViewModel()` on *every* render, so async getters would change every controller, service and view in the project. All network work happens on a timer, never inside a request.
- **`/revalidate` is an optimisation, not a delivery mechanism.** Passenger runs several worker processes and the hook only ever reaches one of them; the others converge through the shared disk mirror on their next tick. Do not build anything on the assumption it reached them all.
- **`data/` and `public/images/managed/` are gitignored.** The app root is also the git working tree on the server, and a dirty tree breaks the next deploy pull. Images live under `public/` deliberately, where LiteSpeed serves them straight off disk; their filenames carry the media uuid, and hcs-app never rewrites an image in place, so a file that exists is current and is never re-fetched.

### Verification
Against a throwaway `mongo:8.0` with hcs-app's real API in front of it:

- Pulled and rendered every page — `/`, `/studies`, both studies, `/blog`, the post, `/services`, `/accreditations`, `/about`, `/contact` — all 200, images served from the local mirror.
- **hcs-app killed and this app restarted: every page still rendered, images included**, with `/version` reporting `source: mirror`.
- Mirror deleted and restarted again: fell through to `source: seed` and the original committed photographs.
- `/revalidate` returned 401 unauthenticated, 401 on a wrong secret, and `{"ok":true}` with the right one.

### Deploying
Safe to deploy at any point, independently of hcs-app: with `CONTENT_API_URL`/`CONTENT_API_TOKEN` unset the site serves the seed content, which is exactly what it shows today. There is no window where the public site is broken.

Once hcs-app is live, set `CONTENT_API_URL`, `CONTENT_API_TOKEN`, `CONTENT_REFRESH_SECONDS` and `CONTENT_REVALIDATE_SECRET` in `.env` on the host — see `.env.example`.

Two server-side items are worth doing first, and neither is in this release:

- **`PassengerFriendlyErrorPages off`** in `.htaccess` — a failed start renders the process environment, which will now include the API token. Add it on its own and verify: an unsupported directive there 500s every request.
- **The `.htaccess` source-blocking rules**, which also keep `data/content.json` from being served off disk. It holds public website copy, so nothing leaks, but it should not be reachable by accident.
