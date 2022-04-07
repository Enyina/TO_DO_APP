const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "Users" }
);

const model = mongoose.model("UserModel", userSchema);

module.exports = model;
