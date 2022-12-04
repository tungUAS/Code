const db = require("../models");
const User = db.user;

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    const isUserThere = await User.findOne({ username });
    const isEmailThere = await User.findOne({ email });

    if (!isUserThere && !isEmailThere) return next();
    res.status(500).send("failed signup");
  } catch (error) {
    console.log(error);
    res.status(500).send("failed signup");
  }
};
