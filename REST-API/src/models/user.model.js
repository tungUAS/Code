const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      roles: String,
      image: String,
    })
  );
  
  module.exports = User;