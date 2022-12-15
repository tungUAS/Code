var express = require("express");
var router = express.Router();
const authJWT = require("../middleware/authJWT");
const bookController = require("../controllers/book.controller");

router.get("/", authJWT.verifyToken, bookController.findAll);

router.get("/:book", authJWT.verifyToken, bookController.findBook);

router.get(
  "/suggest/author/:book",
  authJWT.verifyToken,
  bookController.suggestBooksByAuthor
);

router.get(
  "/suggest/stock/:book",
  authJWT.verifyToken,
  bookController.suggestBooksByStock
);

router.post("/bulkCreate", bookController.bulkCreateBook);

module.exports = router;
