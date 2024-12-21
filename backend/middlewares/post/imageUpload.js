const uploader = require("../../utilities/singleUploader");

const imageUploader = (req, res, next) => {
  const upload = uploader(
    "posts",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Photo are supported jpg, jpeg, png only and should be less then 1m"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        errors: {
          photo: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = imageUploader;
