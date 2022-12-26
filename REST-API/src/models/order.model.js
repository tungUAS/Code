const mongoose = require("mongoose");

const Order = mongoose.model(
  "Order",
  new mongoose.Schema({
    userId: Number,
    orderId: Number,
    shipping: Object,
    payment: Object,
    books: Array
  }, {
    collection: 'orders',
    timestamps: true,
  })
);

module.exports = Order;