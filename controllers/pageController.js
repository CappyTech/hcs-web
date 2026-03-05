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

function sitemap(req, res, next) {
  try {
    const entries = pageService.getSitemapEntries();

    const urls = entries
      .map(
        ({ url, priority, changefreq, lastmod }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`.trimStart()
      )
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    res.set('Content-Type', 'application/xml').send(xml);
  } catch (err) {
    return next(err);
  }
}

function robots(req, res, next) {
  try {
    const content = pageService.getRobotsContent();
    res.set('Content-Type', 'text/plain').send(content);
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
  sitemap,
  robots,
};
