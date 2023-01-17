var express = require("express");
var router = express.Router();
const authJWT = require("../middleware/authJWT");
const bookController = require("../controllers/book.controller");

router.get("/", bookController.findAll);

router.get("/authorDetails", bookController.findBookWithAuthorDetails);

router.get("/:book", bookController.findBook);

router.get("/suggest/author/:book", bookController.suggestBooksByAuthor);

router.get("/suggest/stock/:book", bookController.suggestBooksByStock);

router.post("/bulkCreate",authJWT.verifyTokenAdmin, bookController.bulkCreateBook);

module.exports = router;


