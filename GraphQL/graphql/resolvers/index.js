const bookResolver = require("./book.query");
const authorResolver = require("./author.query");
const authResolver = require("./auth.mutation");
const bookResolverMuta = require("./book.mutation");
const orderResolverMuta = require("./order.mutation");
const { GraphQLUpload } = require('graphql-upload');

const db = require("../../models/index");
const Book = db.book;
const Author = db.author;

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    ...bookResolver.Query,
    ...authorResolver.Query,
  },
  Book: {
    author: async (parent, args, context) => {
      return await context.authorLoader.load(parent.author);
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
    ...orderResolverMuta.Mutation,
  },
};
