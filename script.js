const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Todo = require("./models/todo");
const user = require("./models/user");
const connectDB = require("./config/db");

connectDB();

app.use("/", express.static(path.resolve(__dirname, "assets")));

app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { username, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);

  if (!username || typeof username !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }

  try {
    const response = await user.create({
      username,
      password,
    });
    console.log("User created successfully:", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        status: "error",
        error: "login details already in use",
      });
    }
    throw { error };
  }

  res.json({ status: "ok" });
});

app.post("/api/delete", async (req, res) => {
  const { record } = req.body;
  const response = await Todo.deleteOne({ record });

  console.log(response, "/api/delete repsonse");

  res.json({ status: "ok" });
});

app.post("/api/modify", async (req, res) => {
  const { old: oldTitle, new: newTitle } = req.body;

  const response = await Todo.updateOne(
    {
      record: oldTitle,
    },
    {
      $set: {
        record: newTitle,
      },
    }
  );

  console.log({ response });

  if (!response.modifiedCount) throw new Error("No Todo found");
  //  console.log(response)
  console.log(req.body);

  res.json({ status: "ok" });
});

app.get("/api/get", async (req, res) => {
  const records = await Todo.find({});
  // console.log('Response => ', records)
  res.json(records);
});

app.post("/api/create", async (req, res) => {
  const record = req.body;
  console.log(record);

  // * CREATE (_C_RUD)
  const response = await Todo.create(record);

  //  console.log(response);

  res.json({ status: "ok" });
});

app.listen(13371, () => {
  console.log("Server up");
});
