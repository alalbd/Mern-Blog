const { check, validationResult } = require("express-validator");
const User = require("../../models/userSchema");
const createError = require("http-errors");

// user request data validation
const userValidation = [
  check("full_name")
    .isString()
    .withMessage("Name must be string!")
    .isLength({ min: 4, max: 30 })
    .withMessage("Minimum 5 and maximum 30 letter word are required!")
    .trim(),
  check("username")
    .isString()
    .withMessage("Username must be string!")
    .isLength({ min: 6, max: 12 })
    .withMessage("Username must be 6-12 letter word")
    .isLowercase()
    .withMessage("Username must be lowercase")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ username: value });
        if (user) {
          throw createError(409, "Username already registered!");
        }
      } catch (err) {
        throw createError(500, err.message);
      }
    }),
  check("email")
    .isEmail()
    .withMessage("Valid email required!")
    .isLowercase()
    .withMessage("Email must be lowercase")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError(409, "Email address already registered!");
        }
      } catch (err) {
        throw createError(500, err.message);
      }
    }),
  check("password")
    .isString()
    .isStrongPassword()
    .withMessage(
      "Password must be lenghth 8, minimum 1 uppercase, 1 lowercase, 1 symbol and 1 number."
    ),
];

// User Validation Error Message
const userValidationErrorMsg = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    console.log("working");

    res.status(400).json({
      success: false,
      errors: mappedErrors,
    });
  }
};

module.exports = {
  userValidation,
  userValidationErrorMsg,
};
