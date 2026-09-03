/**
 * services/servicesData.js
 *
 * Single source of truth for the service list. Kept dependency-free so it can be
 * imported anywhere (services hub, fencing page, the shared footer) without
 * creating circular requires.
 *
 * Each service renders a card on the Services hub. Give a service an `image` + a
 * dedicated page `href` (anything other than /contact) once it has real photos
 * and its own page; until then it renders as a text card linking to /contact and
 * is NOT listed in the footer.
 *
 * [TO SUPPLY] Real photos + dedicated pages for the enquire-only services below.
 */

const SERVICES = [
  {
    slug: 'fencing',
    title: 'Fencing & gates',
    description:
      'Boundary, security and communal fencing, plus access and pedestrian gates all supplied and installed to last.',
    image: '/images/fence 1.jpeg',
    imageAlt: 'Boundary fencing installed on a housing estate',
    href: '/fencing',
    cta: 'Learn more',
    // Page-level SEO for the dedicated /fencing page (falls back to title/
    // description above if omitted).
    pageTitle: 'Fencing & Gates for Housing Associations',
    metaDescription:
      'Fencing and gates for housing associations and councils — boundary, security and communal fencing installed across Liverpool, Knowsley and Merseyside.',
  },
  {
    slug: 'paving',
    title: 'Paving & paths',
    description: 'Footpaths, communal paths and hard-standing — laid to safe, even, accessible finishes.',
    image: null,
    href: '/contact',
    cta: 'Enquire',
  },
  {
    slug: 'tarmac',
    title: 'Tarmac & surfacing',
    description: 'Tarmac for roads, car parks and access areas, including works requiring site clearances.',
    image: null,
    href: '/contact',
    cta: 'Enquire',
  },
  {
    slug: 'line-marking',
    title: 'Line marking',
    description: 'Car park bays, road markings and communal parking laid out clearly and durably.',
    image: null,
    href: '/contact',
    cta: 'Enquire',
  },
  {
    slug: 'gutters-groundworks',
    title: 'Gutters & groundworks',
    description: 'Gutter installation and associated groundworks, delivered as a subcontractor and direct.',
    image: null,
    href: '/contact',
    cta: 'Enquire',
  },
  {
    slug: 'estate-improvements',
    title: 'Estate & communal improvements',
    description: 'Wider external works to improve communal areas across an estate, planned around residents.',
    image: null,
    href: '/contact',
    cta: 'Enquire',
  },
];

// All services (for the Services hub grid).
function getServices() {
  return SERVICES;
}

// A single service by slug (for dedicated service pages).
function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

// Services listed in the footer. All services appear; each links to its own
// dedicated page once it has one, otherwise to the services hub (/services).
// So as a service is "made" (its href points at a real page), the footer link
// upgrades from the hub to that page automatically.
function getFooterServices() {
  return SERVICES.map((s) => ({
    title: s.title,
    href: s.href && s.href !== '/contact' ? s.href : '/services',
  }));
}

module.exports = {
  getServices,
  getServiceBySlug,
  getFooterServices,
};
