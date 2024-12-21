const express = require("express");
const dotenv = require("dotenv");
// Initial Env Config
dotenv.config();
const cookieParser = require("cookie-parser");
const mongooseDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/userRoute");
const categoryRouter = require("./routes/categoryRouter");
const postRouter = require("./routes/postRouter");
const {
  notFoundError,
  commonErrorHandle,
} = require("./middlewares/common/errorHandle");

// Database Config
mongooseDB();

// Basic
const app = express();
app.use(cors());

// Cookie Parser Config
app.use(cookieParser());

// Form Request
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, "media")));

// api route
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/post", postRouter);

// 404 Handle
app.use(notFoundError);

// Common error handle
app.use(commonErrorHandle);

// Server Run
const port = process.env.APP_PORT || 5000;
app.listen(port, () => {
  console.log(`Server run in ${port} port`);
});
