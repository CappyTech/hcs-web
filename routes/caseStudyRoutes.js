/**
 * routes/caseStudyRoutes.js
 */

const express = require('express');
const caseStudyController = require('../controllers/caseStudyController');

const router = express.Router();

router.get('/studies', caseStudyController.index);
router.get('/studies/:slug', caseStudyController.show);

module.exports = router;
