const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("name", "rahul");
  console.log(req.cookies);
  res.send("cookie created");
});

app.get("/hash", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("mypassword", salt, function (err, hash) {
      console.log(hash);
    });
  });
  res.send("hash created");
});

app.get("/hashcheck/:hash", (req, res) => {
  bcrypt.compare("mypassword", req.params.hash, function (err, result) {
    console.log(result);
    res.send(result ? "hash match the password" : "wrong password");
  });
});

app.get("/jwt", (req, res) => {
  let a = jwt.sign({ email: "abc@gmail.com" }, "secretkey");
  console.log(a);
  res.send("SHA256 created for secretkey " + a);
});

app.get("/jwtverify/:sha", (req, res) => {
  let b = jwt.verify(req.params.sha, "secretkey");
  console.log(b);
  res.send(b);
});

app.listen(3000);
