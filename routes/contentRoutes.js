/**
 * routes/contentRoutes.js
 */

const express = require('express');
const contentController = require('../controllers/contentController');

const router = express.Router();

router.get('/services', contentController.services);
router.get('/privacy', contentController.privacy);

module.exports = router;
