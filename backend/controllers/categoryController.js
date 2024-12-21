const { default: slugify } = require("slugify");
const Category = require("../models/categorySchema");

// Create category
const categoryCreate = async (req, res, next) => {
  try {
    let newCategory;
    const { category_name } = req.body;

    // make slug
    const catSlug = slugify(category_name);

    newCategory = new Category({
      ...req.body,
      category_name,
      category_slug: catSlug,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category create successfully!",
    });
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

// Category update
const categoryUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    // make slug
    const catSlug = slugify(category_name);

    // exits category id in category document
    const category = await Category.findById(id);

    if (category) {
      category.category_name = category_name;
      category.category_slug = catSlug;

      await category.save();

      res.status(200).json({
        success: true,
        message: "Category update successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found!",
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

// Category Delete
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDelete = await Category.findById(id);

    if (categoryDelete) {
      await Category.deleteOne({ _id: categoryDelete._id });
      res.status(200).json({
        success: true,
        message: "Category delete successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found!",
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

// Get All Category
const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});

    if (category.length > 0) {
      res.status(200).json({
        success: true,
        message: "Category get successfully!",
        data: category,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No category found!",
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

const getAllCat = async (req, res) => {
  try {
    const category = await Category.find({});

    if (category.length > 0) {
      res.status(200).json({
        success: true,
        message: "Category get successfully!",
        data: category,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No category found!",
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
  categoryCreate,
  categoryUpdate,
  deleteCategory,
  getAllCategory,
  getAllCat,
};
