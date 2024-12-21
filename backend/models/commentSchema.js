const mongoose = require("mongoose");

// comment schema
const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  commentDate: {
    type: Date,
    default: Date.now,
  },
  commentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

// Comment Model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
