/**
 * routes/revalidateRoutes.js
 *
 * POST /revalidate — hcs-app calls this when someone publishes, so a change
 * appears here in a second or two rather than at the next poll.
 *
 * It is an optimisation, and the site is correct without it: contentCache polls
 * on its own, and the disk mirror is what the other Passenger workers converge
 * on. This endpoint only ever reaches the one worker that happened to receive
 * the request, and nothing may be built on the assumption that it reached them
 * all.
 *
 * Authorised by a shared secret. Unset, the route answers 503 rather than
 * accepting anonymous calls — the same fail-closed choice hcs-app makes on the
 * other end of this pair.
 */

const crypto = require('crypto');
const express = require('express');
const contentCache = require('../services/contentCache');

const router = express.Router();

function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

router.post('/revalidate', async (req, res, next) => {
  try {
    const expected = String(process.env.CONTENT_REVALIDATE_SECRET || '').trim();
    if (!expected) {
      return res.status(503).json({ ok: false, error: 'Revalidation not configured' });
    }

    const header = String(req.headers.authorization || '');
    const provided = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
    if (!provided || !safeEqual(expected, provided)) {
      return res.status(401).json({ ok: false, error: 'Unauthorized' });
    }

    const changed = await contentCache.refresh('revalidate hook');
    return res.set('Cache-Control', 'no-store').json({ ok: true, changed });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
