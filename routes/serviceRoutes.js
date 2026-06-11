/**
 * routes/contentRoutes.js
 */

const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/fencing', serviceController.getFencingViewModel);

module.exports = router;
