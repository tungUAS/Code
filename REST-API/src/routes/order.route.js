var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order.controller");
const authJWT = require("../middleware/authJWT");

router.post("/bulkCreateOrder",authJWT.verifyTokenUser, orderController.bulkCreateOrder);

module.exports = router;
