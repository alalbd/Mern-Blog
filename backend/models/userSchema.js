const mongoose = require("mongoose");

// User Schema
const userSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    user_role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
