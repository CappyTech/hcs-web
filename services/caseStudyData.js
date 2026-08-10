/**
 * services/caseStudyData.js
 *
 * Single source of truth for case-study content. Kept dependency-free so it can
 * be imported anywhere without circular requires. Swap this in-memory array for
 * a DB/CMS later without touching the service, controller, or views.
 *
 * Each study follows the brief's project-story format:
 *   header (location + scope) → before photo + problem → after photo + result
 *   → optional social-value note.
 *
 * Missing real facts are left empty and clearly marked [TO SUPPLY]; never invent
 * a client, location, stat or quote.
 */

const STUDIES = [
  {
    slug: 'estate-fencing-replacement',
    title: 'Estate fencing replacement',
    // [TO SUPPLY] Confirm the client for this project before naming them.
    client: '',
    location: 'Merseyside',
    scope:
      'Boundary fence replacement, levelling and smoothing of new turf, border features realigned, and paving cleared for proper use.',
    excerpt:
      'Aging boundary fencing replaced and the surrounding ground made good — a clean, level, usable finish.',
    // Card thumbnail for the index listing.
    cardImage: '/images/fence complete 5.jpeg',
    cardImageAlt: 'Completed boundary fencing, level and cleanly finished',
    before: {
      image: '/images/fence before.jpeg',
      alt: 'Aging, damaged boundary fencing before works began',
      caption: 'Aging, damaged boundary fencing was due for replacement.',
    },
    after: {
      image: '/images/fence complete 5.jpeg',
      alt: 'New close-board fencing after completion, level and cleanly finished',
      caption:
        'New fencing installed, turf levelled and smoothed, border features realigned and paving cleared — a clean, level, usable finish.',
    },
    // Optional in-progress gallery (real photos of this job).
    gallery: [
      { image: '/images/fence in process 2.jpeg', alt: 'New fence panels being installed on site' },
      { image: '/images/fence almost done 3.jpeg', alt: 'Fencing nearing completion along the boundary' },
    ],
    content: '',
    socialValue: null,
  },
  {
    slug: 'jobs-plus-social-value',
    title: 'Social value: our Jobs Plus partnership',
    client: 'Plus Dane Housing',
    location: 'Merseyside',
    scope: 'Community social value programme',
    excerpt:
      'Working with Travis Perkins and Plus Dane Housing to develop a safe and confidential space for customers.',
    // [TO SUPPLY] A real photo of the Jobs Plus initiative. Until then the index
    // and detail render a text panel rather than an unrelated project photo.
    cardImage: null,
    cardImageAlt: '',
    before: null,
    after: null,
    gallery: [],
    content:
      '<p>Jobs Plus — working with Travis Perkins and Plus Dane Housing — is developing a safe and confidential space for customers. It is part of our commitment to leaving a positive impact on the communities we work in.</p>',
    socialValue: null,
    // [TO SUPPLY] Specific, verifiable outcomes (dates, numbers, resident feedback).
  },
];

function getStudies() {
  return STUDIES;
}

function getStudyBySlug(slug) {
  return STUDIES.find((s) => s.slug === slug) || null;
}

module.exports = {
  getStudies,
  getStudyBySlug,
};
