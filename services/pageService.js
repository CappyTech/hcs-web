/**
 * services/pageService.js
 *
 * Services hold "business logic" or "data logic".
 * For a static-style website, this can be as simple as returning the
 * title/meta text and a few bits of data used by the templates.
 *
 * Why bother with services for a static site?
 * - It keeps controllers clean.
 * - Later, you can pull data from a CMS, DB, or APIs without rewriting views.
 */

function getBaseViewModel() {
  return {
    site: {
      name: 'Heron Constructive Solutions LTD',
      // Change these when you have real values.
      phone: '0151 475 1217',
      email: 'info@heroncs.co.uk',
    },
  };
}

async function getHomeViewModel() {
  return {
    ...getBaseViewModel(),
    page: {
      title: 'Home',
      activeNav: '/',
      description: 'Reliable construction support and solutions.',
    },
  };
}

async function getAboutViewModel() {
  return {
    ...getBaseViewModel(),
    page: {
      title: 'About',
      activeNav: '/about',
      description: 'Learn more about our company and approach.',
    },
  };
}

async function getContactViewModel() {
  return {
    ...getBaseViewModel(),
    page: {
      title: 'Contact',
      activeNav: '/contact',
      description: 'Send us a message and we will get back to you.',
    },
    // Default form values (helpful when re-rendering after validation error)
    form: {
      name: '',
      email: '',
      message: '',
    },
    error: null,
  };
}

async function submitContactForm({ name, email, message }) {
  // Beginner-friendly validation.
  if (!name || String(name).trim().length < 2) {
    throw new Error('Please enter your name (at least 2 characters).');
  }

  if (!email || !String(email).includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  if (!message || String(message).trim().length < 10) {
    throw new Error('Please enter a message (at least 10 characters).');
  }

  // Nothing else happens in this demo.
  // Later you can send an email using nodemailer or store in a database.
  return;
}

async function get404ViewModel({ path = '' } = {}) {
  return {
    ...getBaseViewModel(),
    page: {
      title: '404 - Not Found',
      activeNav: '',
      description: 'The page you are looking for does not exist.',
    },
    requestedPath: path,
  };
}

async function getErrorViewModel({ statusCode = 500, message = 'Unknown error' } = {}) {
  return {
    ...getBaseViewModel(),
    page: {
      title: `Error ${statusCode}`,
      activeNav: '',
      description: 'An unexpected error occurred.',
    },
    statusCode,
    message,
  };
}

module.exports = {
  getHomeViewModel,
  getAboutViewModel,
  getContactViewModel,
  submitContactForm,
  get404ViewModel,
  getErrorViewModel,
};
