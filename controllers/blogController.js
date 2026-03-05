/**
 * controllers/blogController.js
 */

const blogService = require('../services/blogService');

async function index(req, res, next) {
  try {
    const viewModel = await blogService.getBlogIndexViewModel();
    return res.render('pages/blog/index', viewModel);
  } catch (err) {
    return next(err);
  }
}

async function post(req, res, next) {
  try {
    const viewModel = await blogService.getBlogPostViewModel(req.params.slug);

    if (!viewModel) {
      return next(); // fall through to 404
    }

    return res.render('pages/blog/post', viewModel);
  } catch (err) {
    return next(err);
  }
}

module.exports = { index, post };
