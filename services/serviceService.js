const { getBaseViewModel } = require('./pageService');
const { getServices, getServiceBySlug } = require('./servicesData');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

async function getFencingViewModel() {
  const service = getServiceBySlug('fencing');

  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}${service.href}`,
    page: {
      title: service.pageTitle || service.title,
      activeNav: '/services',
      description: service.metaDescription || service.description,
    },
    service,
  };
}

module.exports = {
  getServices,
  getFencingViewModel,
};
