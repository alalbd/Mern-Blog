const express = require("express");
const {
  categoryCreate,
  categoryUpdate,
  deleteCategory,
  getAllCategory,
  getAllCat,
} = require("../controllers/categoryController");
const {
  categoryValidation,
  categoryValidationError,
} = require("../middlewares/category/categoryValidation");
const {
  loginRequired,
  requireRole,
} = require("../middlewares/common/checkLogin");

const router = express.Router();

// Category Create
router.post(
  "/create",
  loginRequired,
  requireRole(["admin", "user"]),
  categoryValidation,
  categoryValidationError,
  categoryCreate
);

// Category Update
router.put(
  "/update/:id",
  loginRequired,
  requireRole(["admin"]),
  categoryValidation,
  categoryValidationError,
  categoryUpdate
);

// Category delete
router.delete(
  "/delete/:id",
  loginRequired,
  requireRole(["admin"]),
  deleteCategory
);

// Get All Category
router.get(
  "/get/all",
  loginRequired,
  requireRole(["admin", "user"]),
  getAllCategory
);

// Get All Category for all
router.get("/all", getAllCat);

module.exports = router;
