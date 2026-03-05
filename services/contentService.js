/**
 * services/contentService.js
 *
 * View models for standalone content pages (e.g. Services, Privacy Policy).
 * Uses getBaseViewModel from pageService as the shared foundation.
 */

const { getBaseViewModel } = require('./pageService');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

async function getServicesViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/services`,
    page: {
      title: 'Services',
      activeNav: '/services',
      description: 'Explore the construction support and solutions offered by Heron Constructive Solutions LTD.',
    },
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
  getPrivacyViewModel,
};
