const express = require("express");
const app = express();
const userModel = require("./usermodel.js");

app.get("/", (req, res) => {
  res.send("yo");
});
app.get("/create", async (req, res) => {
  let createduser = await userModel.create({
    name: "ujju",
    email: "ujju@gmail.com",
    username: "Ujjwal",
  });
  res.send(createduser);
});

app.get("/update", async (req, res) => {
  let updateduser = await userModel.findOneAndUpdate(
    { username: "Raijien" },
    { name: "Gust" },
    { new: true }
  );
  res.send(updateduser);
});

app.get("/read", async (req, res) => {
  let readuser = await userModel.find();
  res.send(readuser);
});

app.get("/delete", async (req, res) => {
  let deleteduser = await userModel.findOneAndDelete({
    name: "ujju",
  });
  res.send(deleteduser);
});
app.listen(3000);
