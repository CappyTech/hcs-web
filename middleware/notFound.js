/**
 * middleware/notFound.js
 *
 * This runs when no route matched the request.
 */

const pageService = require('../services/pageService');

async function notFound(req, res, next) {
  try {
    const viewModel = await pageService.get404ViewModel({ path: req.path });
    return res.status(404).render('pages/404', viewModel);
  } catch (err) {
    return next(err);
  }
}

module.exports = { notFound };
