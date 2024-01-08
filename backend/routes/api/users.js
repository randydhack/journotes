// backend/routes/api/users.js
const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors,
];

// Sign up
router.post("", validateSignup, async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, firstName, lastName, hashedPassword });

  const safeUser = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

module.exports = router;
