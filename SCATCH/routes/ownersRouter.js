const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
  res.send("yo");
});

if (process.env === "development") {
  console.log("yo");
}
router.post("/create", async (req, res) => {
  let owners = await ownerModel.find();
  if (owners.length > 0) {
    return res
      .sendStatus(500)
      .send("you don't have permission to create a new owner");
  }

  let { fullname, email, password } = req.body;

  let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
  });
  res.status(200).send(createdOwner);
});

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { sucess });
});

module.exports = router;
