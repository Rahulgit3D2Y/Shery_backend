const express = require("express");
const app = express();

const postModel = require("./models/post");
const userModel = require("./models/user");

app.get("/", (req, res) => {
  res.send("ho");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "rahul",
    age: 23,
    email: "abc@gmailcom",
  });
  res.send(user);
});
app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postdata: "HelloWorld!",
    user: "663391fb2c666e5ebaec7d32",
  });
  let user = await userModel.findOne({ _id: "663391fb2c666e5ebaec7d32" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(3000, function () {
  console.log("runnig....");
});
