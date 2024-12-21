const mongoose = require("mongoose");

// post schema
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: "default.png",
      trim: false,
    },
    desc: {
      type: String,
      required: false,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      trim: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// User Model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
