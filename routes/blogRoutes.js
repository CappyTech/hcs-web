/**
 * routes/blogRoutes.js
 */

const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/blog', blogController.index);
router.get('/blog/:slug', blogController.post);

module.exports = router;
