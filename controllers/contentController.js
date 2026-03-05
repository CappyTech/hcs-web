/**
 * controllers/contentController.js
 */

const contentService = require('../services/contentService');

async function services(req, res, next) {
  try {
    const viewModel = await contentService.getServicesViewModel();
    return res.render('pages/content/services', viewModel);
  } catch (err) {
    return next(err);
  }
}

async function privacy(req, res, next) {
  try {
    const viewModel = await contentService.getPrivacyViewModel();
    return res.render('pages/content/privacy', viewModel);
  } catch (err) {
    return next(err);
  }
}

module.exports = { services, privacy };
