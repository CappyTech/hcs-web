/**
 * services/caseStudyService.js
 *
 * View models for case studies ("studies"). Study content lives in
 * caseStudyData.js so it can be swapped for a DB/CMS later without changing
 * this service, the controller, or the views.
 */

const { getBaseViewModel } = require('./pageService');
const { getStudies, getStudyBySlug } = require('./caseStudyData');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

// ---------------------------------------------------------------------------
// View models
// ---------------------------------------------------------------------------

async function getStudiesIndexViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/studies`,
    page: {
      title: 'Case Studies',
      activeNav: '/studies',
      description:
        'Real before-and-after project stories from Heron Constructive Solutions — external works for housing associations and councils across Merseyside.',
    },
    studies: getStudies(),
  };
}

async function getStudyViewModel(slug) {
  const study = getStudyBySlug(slug);

  if (!study) {
    return null;
  }

  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/studies/${study.slug}`,
    page: {
      title: study.title,
      activeNav: '/studies',
      description: study.excerpt,
    },
    study,
  };
}

module.exports = {
  getStudiesIndexViewModel,
  getStudyViewModel,
};
