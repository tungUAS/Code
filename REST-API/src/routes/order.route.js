var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/bulkCreateOrder", orderController.bulkCreateOrder);

module.exports = router;
