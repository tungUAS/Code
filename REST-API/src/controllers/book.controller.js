const db = require("../models");
const Book = db.book;

exports.findAll = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const skip = page * limit - limit;
  try {
    let books;
    if(page && limit){
      books = await Book.find().skip(skip).limit(limit);
    }else{
      books = await Book.find();
    }
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
    const searchById = await Book.findById(toSearchBook);
    if (searchById) {
      return res.status(200).send(searchById);
    }

    const searchByCode = await Book.findOne({ code: toSearchBook });
    if (searchByCode) {
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
    console.log(error);
    return res.status(500).send(error).end();
  }
};

exports.findBookWithAuthorDetails = async (req,res) => {
  try{
    const books = await Book.aggregate([
      {
        "$lookup":{
          "from":"authors",
          "localField":"author",
          "foreignField":"name",
          "as":"authorName"
        }
      },
      {
        $project:{
          _id:1,
          title:1,
          authorName:1,
          year_written:1,
          edition:1,
          price:1,
          quantity:1,
          stock:1,
          ISBN:1,
          code:1
        }
      }
    ]);
    return res.status(200).send(books).end();
  }catch(error){
    console.log(error);
    return res.status(500).send(error).end();
  }
}

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

exports.bulkCreateBook = async (req, res, next) => {
  try {
    const books = req.body.books;

    if (books?.length > 0) {
      let resData = await Book.insertMany(books);

      return res.status(200).send({
        message: "Thành công",
        status: true,
        data: resData,
      });
    }

    return res.status(200).send({
      message: "Thất Bại",
      status: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
