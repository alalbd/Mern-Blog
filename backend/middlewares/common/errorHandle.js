const createError = require("http-errors");

// 404 not found error
const notFoundError = (req, res, next) => {
  next(createError(404, "Content was not found!"));
};

// All Error handle
const commonErrorHandle = (err, req, res, next) => {
  const message =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(500).json({
    success: false,
    errors: {
      common: {
        msg: message,
      },
    },
  });
};

module.exports = {
  notFoundError,
  commonErrorHandle,
};
