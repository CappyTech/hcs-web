/**
 * services/blogData.js
 *
 * Blog content. Posts are authored in hcs-app and pulled by contentCache; the
 * array below is the **seed**, used when there is no cached copy at all — a
 * fresh checkout, or a first boot with hcs-app unreachable.
 *
 * It is deliberately not deleted now that the CMS exists. It is the floor the
 * site falls back to, and the only content guaranteed to be present.
 */
const contentCache = require('./contentCache');

const POSTS = [
  {
    slug: 'welcome-to-hcs',
    title: 'Welcome to Heron Constructive Solutions',
    excerpt: 'An introduction to who we are and what we do.',
    content:
      '<p>Welcome to Heron Constructive Solutions LTD. We provide reliable construction support across Liverpool and Cheshire.</p>',
    author: 'HCS Team',
    publishedAt: '2026-03-05',
    tags: ['news', 'company'],
  },
];

/** Cached shape → the shape the views already read. */
function fromCache(post) {
  return {
    ...post,
    // The views render this string straight into <time> and as the visible
    // date; the API sends an ISO timestamp.
    publishedAt: post.publishedAt ? String(post.publishedAt).slice(0, 10) : '',
  };
}

function getPosts() {
  const cached = contentCache.get('posts');
  return cached ? cached.map(fromCache) : POSTS;
}

function getPostBySlug(slug) {
  return getPosts().find((p) => p.slug === slug) || null;
}

module.exports = {
  getPosts,
  getPostBySlug,
};
