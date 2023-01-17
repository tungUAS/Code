const mongoose = require("mongoose");

const books20000 = mongoose.model(
    "books20000",
    new mongoose.Schema({
        title:String,
        author:String,
        year_written:Number,
        edition:String,
        price:mongoose.Types.Decimal128,
        quantity:Number,
        stock:String,
        ISBN:String,
        code:String
    })
  );
  
  module.exports = books20000;