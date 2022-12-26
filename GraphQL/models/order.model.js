const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId: String,
    orderId: String,
    shipping: Object,
    payment: Object,
    books: Array
  })
);

module.exports = Order;