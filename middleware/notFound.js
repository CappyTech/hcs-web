/**
 * middleware/notFound.js
 *
 * This runs when no route matched the request.
 */

function notFound(req, res) {
  // Respond with a simple HTML page.
  // You can also render an EJS view if you prefer.
  res.status(404).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 - Not Found</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <main class="container">
          <h1>404 - Page Not Found</h1>
          <p>The page <strong>${req.path}</strong> does not exist.</p>
          <p><a href="/">Go back home</a></p>
        </main>
      </body>
    </html>
  `);
}

module.exports = { notFound };
