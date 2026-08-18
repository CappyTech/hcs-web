/**
 * services/caseStudyData.js
 *
 * Case-study content. Studies are authored in hcs-app and pulled by
 * contentCache; the array below is the **seed**, used when there is no cached
 * copy at all — a fresh checkout, or a first boot with hcs-app unreachable.
 *
 * Deliberately kept rather than deleted now that the CMS exists: it is the
 * floor the site falls back to.
 *
 * Each study follows the brief's project-story format:
 *   header (location + scope) → before photo + problem → after photo + result
 *   → optional social-value note.
 *
 * Missing real facts are left empty and clearly marked [TO SUPPLY]; never invent
 * a client, location, stat or quote.
 */

const contentCache = require('./contentCache');

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

/**
 * Cached shape → the shape the views already read.
 *
 * The API sends { media: <uuid>, alt } references rather than URLs, because the
 * images are mirrored locally and served from this host — a URL minted in
 * hcs-app would tie every page view to that host being reachable, which is the
 * one thing this design exists to avoid. contentCache.imageUrl resolves the
 * uuid against the local mirror, and returns null for an image that has not
 * been downloaded, so the views fall back to their no-photograph layout rather
 * than rendering a broken image.
 */
function fromCache(study) {
  const panel = (p) => {
    if (!p) return null;
    const image = contentCache.imageUrl(p);
    return image ? { image, alt: p.alt || '', caption: p.caption || '' } : null;
  };
  const cardImage = contentCache.imageUrl(study.card);
  return {
    ...study,
    cardImage,
    cardImageAlt: (study.card && study.card.alt) || '',
    before: panel(study.before),
    after: panel(study.after),
    gallery: (study.gallery || [])
      .map((g) => {
        const image = contentCache.imageUrl(g);
        return image ? { image, alt: g.alt || '', caption: g.caption || '' } : null;
      })
      .filter(Boolean),
  };
}

function getStudies() {
  const cached = contentCache.get('studies');
  return cached ? cached.map(fromCache) : STUDIES;
}

function getStudyBySlug(slug) {
  return getStudies().find((s) => s.slug === slug) || null;
}

module.exports = {
  getStudies,
  getStudyBySlug,
};
