const db = require("../../models/index");
const Book = db.book;
const checkAuth = require("../../middleware/auth.middleware");

module.exports = {
  Query: {
    books: async (parent,args,context) => {
      checkAuth(context);
      return await Book.find();
    },
    book: async (parent, args,context) => {
      checkAuth(context);
      return Book.findOne({ title: args.title });
    },
    bookByStock: async (parent,args,context) => {
      checkAuth(context);
      return Book.find({stock:args.stock});
    },
  },
};
