const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.book = require("./book.model");
db.author = require("./author.model");

db.ROLES = ["user", "admin"];

module.exports = db;