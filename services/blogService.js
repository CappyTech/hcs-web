/**
 * services/blogService.js
 *
 * View models for the blog. Post content lives in blogData.js so it can be
 * swapped for a DB/CMS later without changing this service, the controller,
 * or the views.
 */

const { getBaseViewModel } = require('./pageService');
const { getPosts, getPostBySlug } = require('./blogData');

const BASE_URL = process.env.BASE_URL || 'https://heroncs.co.uk';

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
