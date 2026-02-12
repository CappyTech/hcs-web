/*
  public/js/site.js

  This is plain browser JavaScript served as a static file.
  Express makes this available at: /js/site.js

  This file is loaded on every page via the footer partial.
*/

(function () {
    // Fill the footer year.
    var yearEl = document.getElementById('js-year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
    // Fill the footer start year.
    var startYearEl = document.getElementById('js-start-year');
    if (startYearEl) {
        var startYear = process.env.START_YEAR || yearEl;
        if (startYear < new Date().getFullYear()) {
            startYearEl.textContent = String(startYear) + ' - ';
        }
    }
})();
