const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.books20000post = require("./book20kpost.model");
db.book = require("./book.model");
db.books20000 = require("./book20k.model");
db.orders = require('./order.model');

db.ROLES = ["user", "admin"];

module.exports = db;