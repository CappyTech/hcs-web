/**
 * services/contentService.js
 *
 * View models for standalone content pages (e.g. Services, Privacy Policy).
 * Uses getBaseViewModel from pageService as the shared foundation.
 */

const { getBaseViewModel } = require('./pageService');
const { getServices } = require('./serviceService');
const { getAccreditations } = require('./accreditationsData');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

async function getServicesViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/services`,
    page: {
      title: 'Services',
      activeNav: '/services',
      description: 'External works services for housing associations and councils — fencing and gates, paving and paths, tarmac and line marking across Merseyside and the North West.',
    },
    services: getServices(),
  };
}

async function getAccreditationsViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/accreditations`,
    page: {
      title: 'Accreditations',
      activeNav: '/accreditations',
      description:
        'Our accreditations and compliance — Constructionline, CHAS, SafeContractor, CITB and Living Wage employer. The first thing procurement teams look for.',
    },
    accreditations: getAccreditations(),
  };
}

async function getPrivacyViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/privacy`,
    page: {
      title: 'Privacy Policy',
      activeNav: '',
      description: 'Privacy policy for Heron Constructive Solutions LTD.',
    },
  };
}

module.exports = {
  getServicesViewModel,
  getAccreditationsViewModel,
  getPrivacyViewModel,
};
