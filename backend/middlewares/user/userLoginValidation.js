const { check, validationResult } = require("express-validator");

// user login validation
const loginValidation = [
  check("username").isString().withMessage("Username & email required!"),
  check("password").isString().withMessage("Password invalid!"),
];

// user login validation error
const loginValidationError = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.status(400).json({
      success: false,
      errors: mappedError,
    });
  }
};

module.exports = {
  loginValidation,
  loginValidationError,
};
