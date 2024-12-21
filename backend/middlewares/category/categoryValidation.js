const { check, validationResult } = require("express-validator");

// category validation
const categoryValidation = [
  check("category_name")
    .isString()
    .withMessage("Category name required!")
    .trim(),
];

// category validation error message
const categoryValidationError = (req, res, next) => {
  const errors = validationResult(req);
  const mappedError = errors.mapped();

  console.log("wor");

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
  categoryValidation,
  categoryValidationError,
};
