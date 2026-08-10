/**
 * services/pageService.js
 *
 * Services hold "business logic" or "data logic".
 * For a static-style website, this can be as simple as returning the
 * title/meta text and a few bits of data used by the templates.
 *
 * Why bother with services for a static site?
 * - It keeps controllers clean.
 * - Later, you can pull data from a CMS, DB, or APIs without rewriting views.
 */

const appInfoService = require('./appInfoService');
const { getFooterServices } = require('./servicesData');
const { getSite, getOffices } = require('./siteData');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

function getBaseViewModel() {
  const appInfo = appInfoService.getAppInfo();
  const site = getSite();
  const offices = getOffices(site);

  return {
    // Services that have their own page — used by the shared footer.
    footerServices: getFooterServices(),
    // Office addresses — rendered as a grid in the shared footer.
    offices,
    site,
    appInfo,
  };
}

async function getHomeViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/`,
    page: {
      title: 'Home',
      activeNav: '/',
      description: 'External works and landscaping contractor for housing associations and councils across Liverpool, Knowsley and Merseyside — fencing, gates, paving and estate improvements.',
    },
  };
}

async function getAboutViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/about`,
    page: {
      title: 'About',
      activeNav: '/about',
      description: 'Approved external works contractor for social housing — our accreditations, compliance and how we work on your estate across Merseyside and the North West.',
    },
  };
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

async function getContactViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/contact`,
    page: {
      title: 'Contact',
      activeNav: '/contact',
      description: 'Send us a message and we will get back to you.',
    },
    // Default form values (helpful when re-rendering after validation error)
    form: {
      name: '',
      email: '',
      message: '',
    },
    error: null,
  };
}

async function submitContactForm({ name, email, message }) {
  // Beginner-friendly validation.
  if (!name || String(name).trim().length < 2) {
    throw new Error('Please enter your name (at least 2 characters).');
  }

  if (!email || !String(email).includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  if (!message || String(message).trim().length < 10) {
    throw new Error('Please enter a message (at least 10 characters).');
  }

  // Nothing else happens in this demo.
  // Later you can send an email using nodemailer or store in a database.
  return;
}

// ---------------------------------------------------------------------------
// 404 and Error pages
// ---------------------------------------------------------------------------

async function get404ViewModel({ path = '' } = {}) {
  return {
    ...getBaseViewModel(),
    page: {
      title: '404 - Not Found',
      activeNav: '',
      description: 'The page you are looking for does not exist.',
    },
    requestedPath: path,
  };
}

async function getErrorViewModel({ statusCode = 500, message = 'Unknown error' } = {}) {
  return {
    ...getBaseViewModel(),
    page: {
      title: `Error ${statusCode}`,
      activeNav: '',
      description: 'An unexpected error occurred.',
    },
    statusCode,
    message,
  };
}

// ---------------------------------------------------------------------------
// SEO utilities
// ---------------------------------------------------------------------------

// Single source of truth for all public pages.
// Add a new entry here whenever a new page/route is created.
const PAGES = [
  { path: '/',         priority: '1.0', changefreq: 'weekly'  },
  { path: '/about',    priority: '0.8', changefreq: 'monthly' },
  { path: '/studies',  priority: '0.8', changefreq: 'monthly' },
  { path: '/contact',  priority: '0.7', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/accreditations', priority: '0.7', changefreq: 'monthly' },
  { path: '/fencing',  priority: '0.7', changefreq: 'monthly' },
  { path: '/blog',     priority: '0.7', changefreq: 'weekly'  },
  { path: '/privacy',  priority: '0.3', changefreq: 'yearly'  },
];

function getSitemapEntries() {
  const lastmod = new Date().toISOString().split('T')[0];
  return PAGES.map(({ path, priority, changefreq }) => ({
    url: `${BASE_URL}${path}`,
    priority,
    changefreq,
    lastmod,
  }));
}

function getRobotsContent() {
  return [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
  ].join('\n');
}

module.exports = {
  getBaseViewModel,
  getHomeViewModel,
  getAboutViewModel,
  getContactViewModel,
  submitContactForm,
  get404ViewModel,
  getErrorViewModel,
  getSitemapEntries,
  getRobotsContent,
};