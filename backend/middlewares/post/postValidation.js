const { check, validationResult } = require("express-validator");
const Post = require("../../models/postSchema");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");

// post validation
const postValidation = [
  check("title")
    .isString()
    .isLength({ max: 100 })
    .withMessage("Title maximum lenght of 100")
    .custom(async (value) => {
      try {
        const title = await Post.findOne({ title: value });
        if (title) {
          throw createError(409, "This blog post already available!");
        }
      } catch (err) {
        throw createError(500, err.message);
      }
    }),
  check("desc")
    .isString()
    .isLength({ max: 255 })
    .withMessage("Desc maximum lenght of 100"),
  check("content").isString().withMessage("Valid content required!"),
];

// post validation message
const postValidationErrorMsg = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // upload file delete
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      console.log("File: ", filename);

      unlink(`media/upload/posts/${filename}`, (err) => {
        if (err) console.log(err);
      });
    }

    res.status(400).json({
      success: false,
      errors: mappedErrors,
    });
  }
};

module.exports = {
  postValidation,
  postValidationErrorMsg,
};
