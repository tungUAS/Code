const db = require("../../models/index");
const Book = db.book;
const {verifyTokenAdmin} = require("../../middleware/auth.middleware");

module.exports = {
  Mutation: {
    bulkCreateBook: async (parent, args, context) => {
      verifyTokenAdmin(context);
      try {
        let res = await Book.insertMany(args.books);

        return res;
      } catch(err) {
        console.log('err', err)
        throw new Error(err);
      }
    },
  },
};
