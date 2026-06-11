const serviceService = require("../services/serviceService");

async function getFencingViewModel(req, res, next) {
  try {
    const viewModel = await serviceService.getFencingViewModel();
    return res.render("pages/content/fencing", viewModel);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getFencingViewModel,
};
