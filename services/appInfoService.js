/**
 * services/appInfoService.js
 *
 * Provides app metadata (name/version) sourced from package.json.
 * Loaded once at startup via Node's require cache.
 */

let packageJson;

function getPackageJson() {
  if (!packageJson) {
    // eslint-disable-next-line global-require
    packageJson = require('../package.json');
  }
  return packageJson;
}

function getAppInfo() {
  const pkg = getPackageJson();

  return {
    name: pkg?.name || 'app',
    version: pkg?.version || '0.0.0',
  };
}

module.exports = {
  getAppInfo,
};
