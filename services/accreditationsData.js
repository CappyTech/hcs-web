/**
 * services/accreditationsData.js
 *
 * Single source of truth for the company's accreditations. Kept dependency-free
 * so it can be imported anywhere without circular requires.
 *
 * [TO SUPPLY] Membership/registration numbers, valid-from/to dates, and links
 * to each certificate. Add them to the entries below once confirmed — procurement
 * teams ask for these.
 */

const contentCache = require('./contentCache');

const ACCREDITATIONS = [
  {
    name: 'Constructionline',
    logo: '/images/Constructionline LOGO.png',
    alt: 'Constructionline registered',
    description: 'UK register of pre-qualified contractors and suppliers.',
    membershipNumber: '', // [TO SUPPLY]
  },
  {
    name: 'CHAS',
    logo: '/images/CHAS LOGO.jpg',
    alt: 'CHAS accredited',
    description: 'The Contractors Health and Safety Assessment Scheme.',
    membershipNumber: '', // [TO SUPPLY]
  },
  {
    name: 'SafeContractor',
    logo: '/images/Safe Contractor LOGO.jpg',
    alt: 'SafeContractor approved',
    description: 'Health &amp; safety accreditation for contractors.',
    membershipNumber: '', // [TO SUPPLY]
  },
  {
    name: 'CITB',
    logo: '/images/CITB LOGO.png',
    alt: 'CITB registered',
    description: 'Construction Industry Training Board — skills and training.',
    membershipNumber: '', // [TO SUPPLY]
  },
  {
    name: 'Living Wage',
    logo: '/images/Living wage LOGO.png',
    alt: 'Living Wage employer',
    description: 'Accredited Living Wage employer.',
    membershipNumber: '', // [TO SUPPLY]
  },
];

// Cached shape → the shape the views already read (a URL string plus alt).
function fromCache(a) {
  return {
    ...a,
    logo: contentCache.imageUrl(a.logo),
    alt: (a.logo && a.logo.alt) || a.name || '',
  };
}

function getAccreditations() {
  const cached = contentCache.get('accreditations');
  return cached ? cached.map(fromCache) : ACCREDITATIONS;
}

module.exports = {
  getAccreditations,
};
