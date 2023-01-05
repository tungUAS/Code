const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models/index");
const User = db.user;
const { AuthenticationError } = require("apollo-server");

exports.verifyTokenUser = async (context) => {
  const token = context.req.headers.authorization;
  if (!token) throw new Error("Unauthorized");
  try {
    const token_decoded = jwt.verify(token, config.SECRET_KEY);
    const user = await User.findOne({username:token_decoded.username});
    if(user.roles !== "user") throw new Error("Unauthorized2");
    return user;
  } catch (error) {
    console.log(error);
    throw new AuthenticationError("Invalid/Expired token");
  }
};

exports.verifyTokenAdmin = async (context) => {
  const token = context.req.headers.authorization;
  if (!token) throw new Error("Unauthorized");
  try {
    const token_decoded = jwt.verify(token, config.SECRET_KEY);
    const admin = await User.findOne({username:token_decoded.username});
    if(admin.roles !== "admin") throw new Error("Unauthorized");
    return admin;
  } catch (error) {
    console.log(error);
    throw new AuthenticationError("Invalid/Expired token");
  }
};

