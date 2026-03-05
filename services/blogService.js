/**
 * services/blogService.js
 *
 * View models and data for the blog.
 * Posts are currently stored in-memory as plain objects.
 * Later you can swap getPosts() to fetch from a DB, CMS, or markdown files
 * without changing any controller or view code.
 */

const { getBaseViewModel } = require('./pageService');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

// ---------------------------------------------------------------------------
// Data source — replace with DB/CMS calls when ready.
// ---------------------------------------------------------------------------

const POSTS = [
  {
    slug: 'welcome-to-hcs',
    title: 'Welcome to Heron Constructive Solutions',
    excerpt: 'An introduction to who we are and what we do.',
    content: '<p>Welcome to Heron Constructive Solutions LTD. We provide reliable construction support across Liverpool and Cheshire.</p>',
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

// ---------------------------------------------------------------------------
// View models
// ---------------------------------------------------------------------------

async function getBlogIndexViewModel() {
  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/blog`,
    page: {
      title: 'Blog',
      activeNav: '/blog',
      description: 'News, insights and updates from Heron Constructive Solutions LTD.',
    },
    posts: getPosts(),
  };
}

async function getBlogPostViewModel(slug) {
  const post = getPostBySlug(slug);

  if (!post) {
    return null;
  }

  return {
    ...getBaseViewModel(),
    canonicalUrl: `${BASE_URL}/blog/${post.slug}`,
    page: {
      title: post.title,
      activeNav: '/blog',
      description: post.excerpt,
    },
    post,
  };
}

module.exports = {
  getBlogIndexViewModel,
  getBlogPostViewModel,
};
