/**
 * controllers/pageController.js
 *
 * Controllers are the "glue" between:
 * - Routes (what URL was requested)
 * - Services (business/data logic)
 * - Views (EJS templates)
 *
 * Controllers should be thin:
 * - read request data (params/query/body)
 * - call services
 * - render a view or redirect
 */

const pageService = require('../services/pageService');
const appInfoService = require('../services/appInfoService');

async function home(req, res, next) {
  try {
    const viewModel = await pageService.getHomeViewModel();
    return res.render('pages/home', viewModel);
  } catch (err) {
    return next(err);
  }
}

async function about(req, res, next) {
  try {
    const viewModel = await pageService.getAboutViewModel();
    return res.render('pages/about', viewModel);
  } catch (err) {
    return next(err);
  }
}

async function contactGet(req, res, next) {
  try {
    const viewModel = await pageService.getContactViewModel();
    return res.render('pages/contact', {
      ...viewModel,
      // Simple flash-style message using the query string (?sent=1).
      sent: req.query.sent === '1',
    });
  } catch (err) {
    return next(err);
  }
}

async function contactPost(req, res, next) {
  try {
    // Data posted from the HTML form.
    const { name, email, message } = req.body;

    // In a real app you might send an email or store this in a DB.
    // Here we just validate and pretend to "submit".
    await pageService.submitContactForm({ name, email, message });

    // Redirect after POST to avoid re-submitting when user refreshes.
    return res.redirect('/contact?sent=1');
  } catch (err) {
    // If validation fails we re-render the page with an error.
    const viewModel = await pageService.getContactViewModel();
    return res.status(400).render('pages/contact', {
      ...viewModel,
      sent: false,
      error: err.message,
      form: {
        name: req.body?.name || '',
        email: req.body?.email || '',
        message: req.body?.message || '',
      },
    });
  }
}

function version(req, res, next) {
  try {
    const appInfo = appInfoService.getAppInfo();
    return res.set('Cache-Control', 'no-store').json(appInfo);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  home,
  about,
  contactGet,
  contactPost,
  version,
};
