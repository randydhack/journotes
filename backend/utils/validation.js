const { validationResult } = require("express-validator");
const { check, query } = require("express-validator");
const { User, Member, Project } = require("../db/models");
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

const validateInvite = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .custom(async (value, {req}) => {
      if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        throw new Error("Please provide a valid email.");
      }
      const existingUser = await User.findOne({where: {email: value}})
      if (!existingUser) {
        // Will use the below as the error message
        throw new Error("User with this email does not exist.");
      }

      const isMember = await Member.findOne({where: {userId: existingUser.id, projectId: req.body.projectId}})
      if (isMember) {
        throw new Error("User is already a member.")
      }
    }),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateInvite,
};
