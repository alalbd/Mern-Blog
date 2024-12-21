const mongoose = require("mongoose");

// User Schema
const categorySchema = mongoose.Schema(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category_slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Category Model
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
