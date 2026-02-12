/**
 * middleware/errorHandler.js
 *
 * Central error handler.
 * Any controller can call next(err) and it will end up here.
 */

function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);

  // If headers are already sent, delegate to Express' default handler.
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <main class="container">
          <h1>Something went wrong</h1>
          <p>${statusCode}</p>
          <pre class="code">${escapeHtml(err.message || 'Unknown error')}</pre>
          <p><a href="/">Go back home</a></p>
        </main>
      </body>
    </html>
  `);
}

// Very small HTML escaping helper for displaying error messages safely.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

module.exports = { errorHandler };
