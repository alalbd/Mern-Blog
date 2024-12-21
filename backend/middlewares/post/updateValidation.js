const { check, validationResult } = require("express-validator");
const Post = require("../../models/postSchema");
const createError = require("http-errors");

// post validation
const postUpdateValidation = [
  check("title")
    .isString()
    .isLength({ max: 100 })
    .withMessage("Title maximum lenght of 100")
    .trim(),
  check("desc")
    .isString()
    .isLength({ max: 255 })
    .withMessage("Desc maximum lenght of 100"),
  check("content").isString().withMessage("Valid content required!"),
];

// post validation message
const postUpdateValidationErrorMsg = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(400).json({
      success: false,
      errors: mappedErrors,
    });
  }
};

module.exports = {
  postUpdateValidation,
  postUpdateValidationErrorMsg,
};
