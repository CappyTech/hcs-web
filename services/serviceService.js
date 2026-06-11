const { getBaseViewModel } = require('./pageService');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

async function getFencingViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/fencing`,
    page: {
      title: 'Fencing',
      activeNav: '/services',
      description: 'Explore the fencing solutions offered by Heron Constructive Solutions LTD.',
    },
  };
}

module.exports = {
  getFencingViewModel,
};
