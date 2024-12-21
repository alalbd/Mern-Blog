const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");
const Category = require("../models/categorySchema");
const slugify = require("slugify");
const { unlink } = require("fs");
const path = require("path");

// Create post
const postCreate = async (req, res, next) => {
  try {
    let newPost;
    const { title, slug, user, category, photo, desc, content } = req.body;

    // create slug
    const validSlug = slugify(title, {
      lower: true,
      trim: true,
    });

    if (photo || req.files.length > 0) {
      newPost = new Post({
        ...req.body,
        slug: validSlug,
        photo: req.files[0].filename,
      });
    } else {
      newPost = new Post({
        ...req.body,
        slug: validSlug,
      });
    }

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post successfully added!",
    });

    console.log(newPost);
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// get a edit data
const postEditData = async (req, res) => {
  try {
    const { id } = req.params;

    const findPost = await Post.findOne({ _id: id });

    if (findPost) {
      res.status(200).json({
        success: true,
        message: "Edit post fetched!",
        data: findPost,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No Post Found!",
        data: findPost,
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// Update post
const postUpdate = async (req, res) => {
  try {
    let newPost;
    const { id } = req.params;
    const { title, user, category, photo, desc, content } = req.body;

    const post = await Post.findById(id);

    if (post && post._id) {
      // create slug
      const validSlug = slugify(title, {
        lower: true,
        trim: true,
      });

      if (req.files.length > 0) {
        if (post.photo) {
          unlink(
            path.join(__dirname, `/../media/upload/posts/${post.photo}`),
            (err) => {
              console.log(err);
            }
          );
        }

        post.title = title;
        post.slug = validSlug;
        post.user = user;
        post.category = category;
        post.photo = req.files[0].filename;
        post.desc = desc;
        post.content = content;

        await post.save();
      } else {
        post.title = title;
        post.slug = validSlug;
        post.user = user;
        post.category = category;
        post.photo = photo;
        post.desc = desc;
        post.content = content;

        await post.save();
      }

      res.status(200).json({
        success: true,
        message: "Post successfully updated!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// Delete Post By Id
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postDelete = await Post.findById(id);

    if (postDelete) {
      await Post.deleteOne({ _id: postDelete._id });

      if (postDelete.photo) {
        unlink(
          path.join(__dirname, `/../media/upload/posts/${postDelete.photo}`),
          (err) => {
            console.log(err);
          }
        );
      }

      res.status(200).json({
        success: true,
        message: "Post delete successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// Create comment
const createComment = async (req, res) => {
  try {
    let newcomment;
    const { id } = req.params;

    const post = await Post.findById({ _id: id });

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    } else {
      // Comment object
      newcomment = new Comment({
        ...req.body,
        comment: req.body.comment,
        commentBy: id,
      });

      // save comment
      const saveComment = await newcomment.save();

      // Push on comment id
      await Post.updateOne(
        { _id: id },
        {
          $push: {
            comments: saveComment._id,
          },
        }
      );

      // response
      res.status(201).json({
        success: true,
        message: "Comment successfully added!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// Delete comment
const deleteComment = async (req, res) => {
  try {
    const { uid, cid } = req.params;

    // Valid user check
    if (uid === req.user.userID) {
      // Delete comment action
      const comment = await Comment.findByIdAndDelete(cid);

      // Remove comment from the post comments array
      const post = await Post.findById(comment.commentBy);

      const index = post.comments.indexOf(cid);

      if (index !== -1) {
        post.comments.splice(index, 1);

        await post.save();
      }

      // response
      res.status(200).json({
        success: true,
        message: "Comment deleted successfully!",
      });
    } else {
      // response
      res.status(401).json({
        success: false,
        message: "You are not authrized to do this action!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// Get all post by user
const getPostByID = async (req, res) => {
  try {
    const { uid } = req.params;

    const findPost = await Post.find({ user: uid })
      .populate("category")
      .select("title desc category createdAt");

    if (findPost) {
      res.status(200).json({
        success: true,
        message: "Post successfully fetch!",
        data: findPost,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No Post Found!",
        data: findPost,
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// Get all post by user
const getPostForAdmin = async (req, res) => {
  try {
    const findPost = await Post.find({})
      .populate("category")
      .populate("user")
      .select("title desc category createdAt");

    if (findPost) {
      res.status(200).json({
        success: true,
        message: "Post successfully fetch!",
        data: findPost,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No Post Found!",
        data: findPost,
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// Global post api
const getPostForAll = async (req, res) => {
  try {
    const post = await Post.find({}).sort({ createdAt: -1 }).limit(10);

    if (post.length > 0) {
      res.status(200).json({
        success: true,
        message: "Post get successfully!",
        data: post,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

const getSearchResult = async (req, res) => {
  try {
    const { title } = req.params;
    const post = await Post.find({ title: { $regex: title, $options: "i" } })
      .sort({ createdAt: -1 })
      .limit(10);

    if (post.length > 0) {
      res.status(200).json({
        success: true,
        message: "Search get successfully!",
        data: post,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// post details
const postDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ _id: id });

    if (post.length > 0) {
      res.status(200).json({
        success: true,
        message: "Post get successfully!",
        data: post,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// fetch by cat id
const postByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const catID = await Category.find({ category_slug: id }).select("_id");
    const post = await Post.find({ category: catID[0]._id });

    if (post.length > 0) {
      res.status(200).json({
        success: true,
        message: "Post get successfully!",
        data: post,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Post found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

module.exports = {
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
};
