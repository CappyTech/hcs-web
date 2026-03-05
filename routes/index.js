/**
 * routes/index.js
 *
 * A "Route" maps a URL + HTTP method to a controller function.
 *
 * Example:
 *   GET /about -> pageController.about
 */

const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

// Pages
router.get('/', pageController.home);
router.get('/about', pageController.about);
router.get('/contact', pageController.contactGet);

// App info
router.get('/version', pageController.version);

// Sitemap
router.get('/sitemap.xml', pageController.sitemap);

// Robots
router.get('/robots.txt', pageController.robots);

// Forms
router.post('/contact', pageController.contactPost);

module.exports = router;
