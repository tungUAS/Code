const bookResolver = require("./book.query");
const authorResolver = require("./author.query");
const authResolver = require("./auth.mutation");
const bookResolverMuta = require("./book.mutation");

const db = require("../../models/index");
const Author = db.author;
const Book = db.book;

module.exports = {
  Query: {
    ...bookResolver.Query,
    ...authorResolver.Query,
  },
  Book: {
    author: async (parent, args) => {
      return await Author.findOne({ name: parent.author });
    },
  },
  Author: {
    books: async (parent, args) => {
      return await Book.find({ author: parent.name });
    },
  },
  Mutation: {
    ...authResolver.Mutation,
    ...bookResolverMuta.Mutation,
  },
};
