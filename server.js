/**
 * server.js
 *
 * This file is the entry point that starts the HTTP server.
 * In bigger projects you keep "create the app" separate from "start listening".
 * That separation makes it easier to test the app.
 */

const { createApp } = require('./app');

const PORT = process.env.PORT || 3000;

const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
