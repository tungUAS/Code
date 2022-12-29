var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;

exports.signup = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: "user",
  });
  try {
    await user.save();
    res.status(200).send("sign up successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("failed signup");
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) res.status(500).send("Sign in failed");

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) res.status(500).send("Sign in failed");

    const token = jwt.sign({ username: user.username }, config.secret, {
      expiresIn: 86400,
    });
    res
      .status(200)
      .send({ username: user.username, email: user.email, token: token });
  } catch (error) {
    res.status(500).send("Sign in failed");
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const {email, username, userId} = req.body;
    const imgBase64 = req?.file?.buffer?.toString("base64");

    /**
     * Lưu data:image/jpg;base64,
     */
    let response = await User.updateOne({
      _id: userId,
    }, {
      email: email,
      username: username,
      image: imgBase64,
    }, {
      upsert: true,
    })

    let resUser = await User.find({
      _id: userId
    })

    res.status(200).json({
      data: resUser
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).send("updateProfile failed");
  }
};
