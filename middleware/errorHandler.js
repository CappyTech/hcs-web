/**
 * middleware/errorHandler.js
 *
 * Central error handler.
 * Any controller can call next(err) and it will end up here.
 */

const pageService = require('../services/pageService');

async function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);

  // If headers are already sent, delegate to Express' default handler.
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  try {
    const viewModel = await pageService.getErrorViewModel({
      statusCode,
      message: err.message || 'Unknown error',
    });
    return res.status(statusCode).render('pages/error', viewModel);
  } catch (renderErr) {
    // If rendering fails, fall back to a plain-text response.
    return res.status(statusCode).type('text').send(`${statusCode} - ${err.message || 'Unknown error'}`);
  }
}

module.exports = { errorHandler };
