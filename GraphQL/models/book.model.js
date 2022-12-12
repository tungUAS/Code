const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    author: String,
    year_written: Number,
    edition: String,
    price: mongoose.Types.Decimal128,
    quantity: Number,
    stock: String,
    ISBN: String,
    code: String,
  })
);

module.exports = Book;
