const { validationResult } = require("express-validator");
const { check, query } = require("express-validator");
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach((error) => (errors[error.param] = error.msg));

    const err = Error("Validation Error");
    err.status = 400;
    err.title = "Validation Error";
    err.errors = errors;
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
