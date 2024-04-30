const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { name, email, imageUrl } = req.body;
  const createduser = await userModel.create({
    name,
    email,
    imageUrl,
  });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  let editUser = await userModel.findOne({
    _id: req.params.id,
  });
  res.render("edit", { user: editUser });
});

app.post("/update/:id", async (req, res) => {
  let { name, email, imageUrl } = req.body;
  let editUser = await userModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { imageUrl, name, email },
    { new: true }
  );
  res.redirect("/read");
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.redirect("/read");
});

app.listen(3000, function () {
  console.log("running");
});
