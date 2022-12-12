const db = require("../../models/index");
const Book = db.book;

module.exports = {
  Mutation: {
    bulkCreateBook: async (parent, args, context) => {
      try {
        let res = await Book.insertMany(args.books);

        return res;
      } catch(err) {
        throw new Error(err);
      }
    },
  },
};
