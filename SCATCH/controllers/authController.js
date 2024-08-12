const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user)
      return res.status(401).send("Already have an account, please login");

    bcrypt.genSalt(10, function (err, salt) {
      if (err) return res.send(err.message);

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let newUser = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(newUser);
          res.cookie("token", token);
          res.send("User created successfully");
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) return res.send("Email or password incorrect");

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) return res.send("Error during password comparison");

    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.send("You can login");
    } else {
      return res.send("Email or password incorrect");
    }
  });
};
module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.send("Logged out successfully");
};
