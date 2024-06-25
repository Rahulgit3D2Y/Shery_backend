const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

router.get("/", (req, res) => {
  res.send("yo");
});

router.post("/register", (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    bcrpyt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user created succesully");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
