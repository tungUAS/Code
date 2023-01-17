const db = require("../../models/index");
const Book = db.book;
const Book20000 = db.books20000;
const crypto = require("crypto");

module.exports = {
  Query: {
    books: async (parent,args,context) => {
      const etag = context.req.headers["if-none-match"];
      console.log(context.req.headers);
      console.log(etag);
      context.req.res.setHeader("Access-Control-Expose-Headers","*");
      const books = await Book20000.find();
      let etagBooks = JSON.stringify(books);
      etagBooks = crypto.createHash("sha1").update(etagBooks).digest("base64");
      if(etag === etagBooks) throw new Error("Etag already there..");
      context.req.res.setHeader("ETag",etagBooks);
      return books;
    },
    book: async (parent, args,context) => {
      //checkAuth(context);
      if(args.title){
        return await Book.findOne({title:args.title})
      }
      if(args.code){
        return await Book.findOne({code:args.code})
      }
      if(args.ISBN){
        return await Book.findOne({ISBN:args.ISBN})
      }
      if(args.id){
        return await Book.findById( args.id );
      }
    },
    bookByStock: async (parent,args,context) => {
      //checkAuth(context);
      return await Book.find({stock:args.stock});
    }
  }
};
