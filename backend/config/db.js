const mongoose = require("mongoose");

const mongooseDB = async () => {
  try {
    const dbURL = process.env.MONGODB;
    await mongoose.connect(dbURL);
    console.log("MongoDB connect successfully!");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = mongooseDB;
