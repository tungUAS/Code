const mongoose = require("mongoose");

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    yob: Number,
  })
);

module.exports = Author;
