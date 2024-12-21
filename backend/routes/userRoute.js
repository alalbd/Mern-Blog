const express = require("express");
const {
  userSignup,
  userLogin,
  profileUpdate,
  profilePassUpdate,
} = require("../controllers/userController");
const {
  userValidation,
  userValidationErrorMsg,
} = require("../middlewares/user/userValidation");
const {
  loginValidation,
  loginValidationError,
} = require("../middlewares/user/userLoginValidation");

const {
  loginRequired,
  requireRole,
} = require("../middlewares/common/checkLogin");

const router = express.Router();

// User Signup
router.post("/signup", userValidation, userValidationErrorMsg, userSignup);

// User Login
router.post("/login", loginValidation, loginValidationError, userLogin);

// User Profile Update
router.put(
  "/profile/update/:id",
  loginRequired,
  requireRole(["admin", "user"]),
  profileUpdate
);

// User Profile Update
router.put(
  "/profile/password/update/:id",
  loginRequired,
  requireRole(["admin", "user"]),
  profilePassUpdate
);

module.exports = router;
