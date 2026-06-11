/**
 * app.js
 *
 * This file configures the Express application:
 * - view engine (EJS)
 * - middleware (static files, body parsing)
 * - routes
 * - error handling
 */

const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const appInfoService = require('./services/appInfoService');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();

  // App metadata (available in all EJS renders as locals)
  app.locals.appInfo = appInfoService.getAppInfo();
  app.locals.appVersion = app.locals.appInfo.version;

  // ----- Views (EJS) -----
  // We store our templates in /views.
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.set('layout', 'layout');

  // ----- Middleware -----
  app.use(expressLayouts);
  // Serve static files (CSS/JS/images) from the /public folder.
  // Example: public/css/styles.css becomes /css/styles.css in the browser.
  app.use(express.static(path.join(__dirname, 'public')));

  // Parse URL-encoded form submissions (like HTML <form method="POST">).
  app.use(express.urlencoded({ extended: false }));

  // Parse JSON request bodies (useful if you later add fetch/AJAX APIs).
  app.use(express.json());

  const pageRoutes = require('./routes/pageRoutes');
  const contentRoutes = require('./routes/contentRoutes');
  const blogRoutes = require('./routes/blogRoutes');
  const serviceRoutes = require('./routes/serviceRoutes');
  // ----- Routes -----
  app.use('/', pageRoutes);
  app.use('/', contentRoutes);
  app.use('/', blogRoutes);
  app.use('/', serviceRoutes);

  // ----- 404 + Error handling -----
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
