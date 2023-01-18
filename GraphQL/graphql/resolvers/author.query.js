const db = require("../../models/index");
const Author = db.author;
const checkAuth = require("../../middleware/auth.middleware");

module.exports = {
    Query: {
      authors: async (parent,args,context) => {
        return await Author.find();
      },
      author: async (parent, args,context) => {
        return await Author.findById(args.id);
      }
    }
};
