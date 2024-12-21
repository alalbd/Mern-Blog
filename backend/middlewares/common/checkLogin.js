const createError = require("http-errors");
const jwt = require("jsonwebtoken");

// login required do anything
const loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // Don't have a authorization
    if (token === undefined) {
      next(createError(401, "Not authorized, token failed"));
    }

    const validToken = token.split("Bearer ")[1];

    // veryfiy jwt token
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(validToken, jwtSecret);

    if (decoded) {
      req.user = decoded;

      // sent to the next middleware
      next();
    } else {
      next(createError(401, "Not authorized, token failed"));
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      errors: {
        common: {
          msg: "Not authorized, token failed!",
        },
      },
    });
  }
};

// user role check
const requireRole = (role) => {
  return (req, res, next) => {
    const { user_role } = req.user;

    if (user_role && role.includes(user_role)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        errors: {
          common: {
            msg: "You are a not authorized to do this action!",
          },
        },
      });
    }
  };
};
module.exports = { loginRequired, requireRole };
