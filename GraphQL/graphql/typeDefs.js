const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: Author
    year_written: Int
    edition: String
    price: Float
    quantity: Int
    stock: String
    ISBN: String
    code: String
  }

  type Author {
    id: ID
    name: String
    yob: Int
    books: [Book]
  }

  type User {
    id: ID
    username: String
    email: String
    roles: String
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
    roles: String
  }

  input SigninInput {
    email: String
    password: String
  }

  type Query {
    books: [Book]
    book(title: String!): Book
    bookByStock(stock: String!): [Book]
    authors: [Author]
    author(name: String!): Author
  }

  input authorInput {
    id: ID
    name: String
    yob: Int
  }

  input BulkCreateBookInput {
    title: String
    year_written: Int
    edition: String
    price: Float
    quantity: Int
    stock: String
    ISBN: String
    code: String
    author: authorInput
  }

  type Mutation {
    createAuthor(name: String!,yob: Int!): Author
    register(registerInput: RegisterInput): User!
    signin(signinInput: SigninInput): User!
    bulkCreateBook(books: [BulkCreateBookInput]): [Book]
  }
`;
module.exports = typeDefs;
