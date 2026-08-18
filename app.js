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
const contentCache = require('./services/contentCache');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();

  // Load the content mirror from disk and start polling hcs-app. Not awaited:
  // the site serves from the mirror (or the built-in seed data) immediately,
  // whether or not hcs-app is reachable, and a slow API must not delay boot.
  contentCache.start();

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

  // Serve Tailwind Plus Elements (npm package) — powers <el-dialog> modals.
  // Example: /vendor/elements/index.js in the browser.
  app.use('/vendor/elements', express.static(path.join(__dirname, 'node_modules', '@tailwindplus', 'elements', 'dist')));

  // Parse URL-encoded form submissions (like HTML <form method="POST">).
  app.use(express.urlencoded({ extended: false }));

  // Parse JSON request bodies (useful if you later add fetch/AJAX APIs).
  app.use(express.json());

  const pageRoutes = require('./routes/pageRoutes');
  const contentRoutes = require('./routes/contentRoutes');
  const blogRoutes = require('./routes/blogRoutes');
  const serviceRoutes = require('./routes/serviceRoutes');
  const caseStudyRoutes = require('./routes/caseStudyRoutes');
  const revalidateRoutes = require('./routes/revalidateRoutes');
  // ----- Routes -----
  app.use('/', pageRoutes);
  app.use('/', contentRoutes);
  app.use('/', blogRoutes);
  app.use('/', serviceRoutes);
  app.use('/', caseStudyRoutes);
  app.use('/', revalidateRoutes);

  // ----- 404 + Error handling -----
  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
