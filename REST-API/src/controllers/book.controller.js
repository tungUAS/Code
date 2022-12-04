const db = require("../models");
const Book = db.book;

exports.findAll = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = page * limit - limit;
  try {
    const books = await Book.find().skip(skip).limit(limit);
    return res.status(200).send(books);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

exports.findBook = async (req, res) => {
  const toSearchBook = req.params.book;
  console.log(toSearchBook);
  try {
    const searchByCode = await Book.findOne({ code: toSearchBook });
    if (searchByCode) {
      console.log("here ", searchByCode);
      return res.status(200).send(searchByCode);
    }

    const searchByTitle = await Book.findOne({ title: toSearchBook });
    if (searchByTitle) {
      return res.status(200).send(searchByTitle);
    }

    const searchByISBN = await Book.findOne({ ISBN: toSearchBook });
    if (searchByISBN) {
      return res.status(200).send(searchByISBN);
    }

    return res.status(404).end();
  } catch (error) {
    return res.status(500).end();
  }
};

exports.suggestBooksByAuthor = async (req, res) => {
  const title = req.params.book;
  try {
    const book = await Book.findOne({ title: title });
    const sameAuthors = await Book.find(
      { author: book.author },
      { title: { $ne: title } }
    );

    if (!sameAuthors) return res.status(404).send("nothing found");

    return res.status(200).send(sameAuthors);
  } catch (error) {
    return res.status(500).end();
  }
};

exports.suggestBooksByStock = async (req, res) => {
  const title = req.params.book;
  try {
    const book = await Book.findOne({ title: title });
    console.log(book.stock);
    const sameStock = await Book.find({
      title: { $ne: title },
      stock: { $eq: book.stock },
    });

    if (!sameStock) return res.status(404).send("nothing found");

    return res.status(200).send(sameStock);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};
