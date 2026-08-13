/**
 * services/blogData.js
 *
 * Single source of truth for blog content. Kept dependency-free so it can be
 * imported anywhere without circular requires. Swap these in-memory posts for a
 * DB/CMS later without touching the controller or views.
 */

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

function getPosts() {
  return POSTS;
}

function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug) || null;
}

module.exports = {
  getPosts,
  getPostBySlug,
};
