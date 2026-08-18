/**
 * services/siteData.js
 *
 * Single source of truth for the company's site identity: name, contact details,
 * social handles, SEO defaults and office addresses. Kept dependency-free so it
 * can be imported anywhere (pageService, the shared footer/head) without
 * circular requires.
 */

const contentCache = require('./contentCache');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

/**
 * The values below are the **seed**: what the site shows before it has ever
 * pulled from hcs-app, and what it falls back to if it never can. getSite()
 * layers the cached settings on top, key by key, so a field the CMS does not
 * carry keeps the value here rather than becoming blank.
 *
 * That merge direction matters: this object drives every page's <head> and the
 * shared footer, so a partial payload must degrade to the defaults, never to an
 * empty company name or a missing company number.
 */
function seedSite() {
  return {
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
    // [TO SUPPLY] Add a 1200x630 og-image.png to /public/images and restore
    // this to `${BASE_URL}/images/og-image.png`. Left empty so head.ejs skips
    // the (currently missing) social-share image rather than linking a 404.
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterHandle: process.env.TWITTER_HANDLE || '',
    instagramHandle: process.env.INSTAGRAM_HANDLE || '',
    facebookHandle: process.env.FACEBOOK_HANDLE || '',
    linkedinHandle: process.env.LINKEDIN_HANDLE || '',
    facebookAppId: process.env.FACEBOOK_APP_ID || '',
    pinterest: 'nopin',
    // Statutory disclosure (Companies House 09276951). Registered office is the
    // Liverpool address below. [TO SUPPLY] VAT number if VAT-registered.
    companyNumber: '09276951',
    registrationCountry: 'England and Wales',
    companyType: 'Private limited company',
    vatNumber: '',
    // Marketing / policy copy that could change over time.
    tagline: 'Trusted external works specialists across Liverpool, Knowsley and Merseyside.',
    inbox: {
      monitored: 'Monitored by our staff and forwarded to the relevant department.',
      response: 'We aim to respond within 24 hours (please allow up to 48).',
    },
    // Opening hours — rendered on Contact and in the footer.
    // [TO SUPPLY] These are assumed defaults — confirm the real office hours.
    hours: [
      { days: 'Monday – Friday', time: '8:00am – 5:00pm' },
      { days: 'Saturday – Sunday', time: 'Closed' },
    ],
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
      phone: '01928 333 212',
      address: {
        line1: 'Windmill Lane',
        line2: 'Preston Brook',
        line3: 'Warrington',
        line4: 'Cheshire',
        postcode: 'WA4 4AZ',
      },
    },
    garston: {
      phone: '0151 475 1217',
      address: {
        line1: "91 St Mary's Road",
        line2: 'Garston',
        line3: 'Liverpool',
        line4: 'Merseyside',
        postcode: 'L19 2NL',
      },
    },
  };
}

/**
 * Site identity: the seed, with anything hcs-app publishes layered over it.
 *
 * ogImage arrives as a media uuid and is resolved to an absolute URL here —
 * og:image is read by other people's servers, so a relative path is useless.
 * An image that has not been mirrored yet resolves to '', which makes head.ejs
 * omit the tag rather than advertise a 404.
 */
function getSite() {
  const seed = seedSite();
  const cached = contentCache.get('site');
  if (!cached) return seed;

  const merged = { ...seed };
  for (const [key, value] of Object.entries(cached)) {
    if (value === null || value === undefined || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    merged[key] = value;
  }

  const ogPath = cached.ogImage ? contentCache.imageUrl({ media: cached.ogImage }) : null;
  merged.ogImage = ogPath ? `${BASE_URL}${ogPath}` : '';

  return merged;
}

// Office addresses rendered as a data-driven grid in the footer.
//
// The published settings carry an ordered `offices` array, which is what lets
// an office be added or removed without a code change. The three named keys
// below are the seed's shape and remain the fallback.
function getOffices(site = getSite()) {
  if (Array.isArray(site.offices) && site.offices.length) {
    return site.offices.map((o) => ({ label: o.label, phone: o.phone, address: o.address }));
  }
  return [
    { label: 'Liverpool office', phone: site.liverpool.phone, address: site.liverpool.address },
    { label: 'Cheshire office', phone: site.cheshire.phone, address: site.cheshire.address },
    { label: 'Garston office', phone: site.garston.phone, address: site.garston.address },
  ];
}

module.exports = {
  getSite,
  getOffices,
};
