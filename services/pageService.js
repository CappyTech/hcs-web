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

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

function getBaseViewModel() {
  const appInfo = appInfoService.getAppInfo();
  return {
    site: {
      name: 'Heron Constructive Solutions LTD',
      url: BASE_URL,
      email: 'info@heroncs.co.uk',
      // Localisation
      locale: 'en_GB',
      // Mobile / PWA
      themeColor: '#ffffff',
      // SEO
      robots: 'index, follow',
      // Branding
      startYear: parseInt(process.env.START_YEAR, 10) || 2025,
      // Social
      ogType: 'website',
      ogImage: `${BASE_URL}/images/og-image.png`,
      twitterCard: 'summary_large_image',
      twitterHandle: process.env.TWITTER_HANDLE || '',
      instagramHandle: process.env.INSTAGRAM_HANDLE || '',
      facebookHHandle: process.env.FACEBOOK_HANDLE || '',
      linkedinHandle: process.env.LINKEDIN_HANDLE || '',
      facebookAppId: process.env.FACEBOOK_APP_ID || '',
      pinterest: 'nopin',
      liverpool: {
        phone: '0151 475 1217',
        address: {
          line1: '103 Herondale Road',
          line2: 'Mossley Hill',
          line3: 'Liverpool',
          line4: 'Merseyside',
          postcode: 'L18 1JZ',
        },
      },
      cheshire: {
        phone: '01298 333 212',
        address: {
          line1: '456 Kingfisher Lane',
          line2: 'Chester Business Park',
          line3: 'Chester',
          line4: 'Cheshire',
          postcode: 'CH4 9QH',
        },
      },
    },
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
      description: 'Reliable construction support and solutions.',
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
      description: 'Learn more about our company and approach.',
    },
  };
}

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

// ---------------------------------------------------------------------------
// SEO utilities
// ---------------------------------------------------------------------------

// Single source of truth for all public pages.
// Add a new entry here whenever a new page/route is created.
const PAGES = [
  { path: '/',         priority: '1.0', changefreq: 'weekly'  },
  { path: '/about',    priority: '0.8', changefreq: 'monthly' },
  { path: '/contact',  priority: '0.7', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog',     priority: '0.7', changefreq: 'weekly'  },
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
