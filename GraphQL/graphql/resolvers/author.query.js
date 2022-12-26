const db = require("../../models/index");
const Author = db.author;
const checkAuth = require("../../middleware/auth.middleware");

module.exports = {
    Query: {
      authors: async (parent,args,context) => {
        // checkAuth(context);
        return await Author.find();
      },
      author: async (parent, args,context) => {
        // checkAuth(context);
        return Author.findOne({ name: args.name });
      }
    }
};