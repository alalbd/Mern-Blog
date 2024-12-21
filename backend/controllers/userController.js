const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// user signup
const userSignup = async (req, res, next) => {
  try {
    let newUser;
    const { full_name, username, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    newUser = new User({
      ...req.body,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User register successfully!",
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

// user login
const userLogin = async (req, res, next) => {
  try {
    // user requested data
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    });

    if (user && user._id) {
      // password match check
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        // user object
        const userObj = {
          userID: user._id,
          name: user.full_name,
          username: user.username,
          email: user.email,
          user_role: user.user_role || "user",
        };

        // Generate Token
        const jwtSecret = process.env.JWT_SECRET;
        const tokenExpire = process.env.EXPIRES_TIME; // 7 Days
        const token = jwt.sign(userObj, jwtSecret, {
          expiresIn: tokenExpire,
        });

        // Response
        return res.status(200).json({
          success: true,
          message: "User successfully logged!",
          token,
          user: userObj,
        });
      }
      {
        return res.status(500).json({
          success: false,
          errors: {
            common: {
              msg: "Internal server error!",
            },
          },
        });
      }
    }
  } catch {
    return res.status(500).json({
      success: false,
      errors: {
        common: {
          msg: "Internal server error!",
        },
      },
    });
  }
};

// profile update
const profileUpdate = async (req, res) => {
  try {
    let newPost;
    const { id } = req.params;
    const { fullname } = req.body;

    const user = await User.findById(id);

    if (user && user._id) {
      user.full_name = fullname;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User profile successfully updated!",
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

// password update
const profilePassUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const user = await User.findById(id);

    if (user && user._id) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "User password successfully updated!",
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
  userSignup,
  userLogin,
  profileUpdate,
  profilePassUpdate,
};
