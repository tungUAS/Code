const db = require("../../models/index");
const Book = db.book;
const book20kpost = db.books20000post;
const {verifyTokenAdmin} = require("../../middleware/auth.middleware");

module.exports = {
  Mutation: {
    bulkCreateBook: async (parent, args, context) => {
      verifyTokenAdmin(context);
      try {
        let res = await book20kpost.insertMany(args.books);

        return res;
      } catch(err) {
        console.log('err', err)
        throw new Error(err);
      }
    },
  },
};
