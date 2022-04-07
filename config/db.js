const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_URL);
    console.log("DB connected");
  } catch (error) {
    throw error;
  }
};

module.exports = connectDB;
