/**
 * controllers/caseStudyController.js
 */

const caseStudyService = require('../services/caseStudyService');

async function index(req, res, next) {
  try {
    const viewModel = await caseStudyService.getStudiesIndexViewModel();
    return res.render('pages/studies/index', viewModel);
  } catch (err) {
    return next(err);
  }
}

async function show(req, res, next) {
  try {
    const viewModel = await caseStudyService.getStudyViewModel(req.params.slug);

    if (!viewModel) {
      return next(); // fall through to 404
    }

    return res.render('pages/studies/study', viewModel);
  } catch (err) {
    return next(err);
  }
}

module.exports = { index, show };
