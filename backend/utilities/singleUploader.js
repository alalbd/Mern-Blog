const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const uploader = (subPath, allowdFileType, maxFileSize, errorMsg) => {
  // define upload path
  // const UPLOAD_PATH = `${__dirname}/..public/upload/${subPath}/`;

  // const ddd = path.join(__dirname, `/..public/upload/posts/`);

  // console.log("path: ", ddd);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `media/upload/${subPath}/`);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      if (allowdFileType.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errorMsg));
      }
    },
  });

  return upload;
};

module.exports = uploader;
