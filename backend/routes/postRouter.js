const express = require("express");
const {
  postCreate,
  postEditData,
  postUpdate,
  deletePost,
  createComment,
  deleteComment,
  getPostByID,
  getPostForAdmin,
  getPostForAll,
  getSearchResult,
  postDetails,
  postByCategory,
} = require("../controllers/postController");

const {
  loginRequired,
  requireRole,
} = require("../middlewares/common/checkLogin");
const {
  postValidation,
  postValidationErrorMsg,
} = require("../middlewares/post/postValidation");
const {
  postUpdateValidation,
  postUpdateValidationErrorMsg,
} = require("../middlewares/post/updateValidation");
const imageUploader = require("../middlewares/post/imageUpload");

const router = express.Router();

// Create Post
router.post(
  "/create",
  loginRequired,
  requireRole(["admin", "user"]),
  imageUploader,
  postValidation,
  postValidationErrorMsg,
  postCreate
);

// Get a update post data
router.get(
  "/update/:id",
  loginRequired,
  requireRole(["admin", "user"]),
  postEditData
);

// Update post
router.put(
  "/update/:id",
  loginRequired,
  requireRole(["admin", "user"]),
  imageUploader,
  postUpdateValidation,
  postUpdateValidationErrorMsg,
  postUpdate
);

// Delete Post
router.delete(
  "/delete/:id",
  loginRequired,
  requireRole(["admin", "user"]),
  deletePost
);

// Create Comment
router.post(
  "/create/:id/comment",
  loginRequired,
  requireRole(["admin", "user"]),
  createComment
);

// Delete Comment
router.delete(
  "/delete/:uid/comment/:cid",
  loginRequired,
  requireRole(["admin", "user"]),
  deleteComment
);

// All Post By User
router.get(
  "/all/:uid",
  loginRequired,
  requireRole(["admin", "user"]),
  getPostByID
);

// All Post For Admin
router.get("/all", loginRequired, requireRole(["admin"]), getPostForAdmin);

// Get post for all
router.get("/get/for/all", getPostForAll);

// Search result
router.get("/search/result/:title", getSearchResult);

// Post detals
router.get("/details/:id", postDetails);

// Fetch by category id
router.get("/category/:id", postByCategory);

module.exports = router;
