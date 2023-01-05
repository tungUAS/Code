const db = require("../../models/index");
const Book = db.book;

module.exports = {
  Query: {
    books: async (parent,args,context) => {
      return await Book.find();
    },
    book: async (parent, args,context) => {
      //checkAuth(context);
      if(args.title){
        return Book.findOne({title:args.title})
      }
      if(args.code){
        return Book.findOne({code:args.code})
      }
      if(args.ISBN){
        return Book.findOne({ISBN:args.ISBN})
      }
      if(args.id){
        return Book.findById( args.id );
      }
    },
    bookByStock: async (parent,args,context) => {
      //checkAuth(context);
      return Book.find({stock:args.stock});
    }
  }
};
