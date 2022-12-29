const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload
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

  input Shipping {
    name: String
  }

  input Payment {
    name: String
  }

  input bookInput {
    id: ID
    title: String
    year_written: Int
    edition: String
    price: Float
    quantity: Int
    stock: String
    ISBN: String
    code: String
  }

  input OrderInput {
    userId: Int
    orderId: Int
    shipping: Shipping
    payment: Payment
    books: [bookInput]
  }

  input RegisterInput {
    username: String
    email: String
    password: String
    roles: String
    images: String
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
    author: String
  }

  type File {
    fileName: String
    mimeType: String
    encoding: String
  }

  input updateProfileInput {
    username: String
    email: String
    images: String
    userId: String
  }

  type Mutation {
    createAuthor(name: String!,yob: Int!): Author
    register(registerInput: RegisterInput): User!
    signin(signinInput: SigninInput): User!
    bulkCreateBook(books: [BulkCreateBookInput]): [Book]
    bulkCreateOrder(orders: [OrderInput]): Boolean
    uploadImage(file: Upload!): String!
    updateProfile(user: updateProfileInput): Boolean
  }
`;
module.exports = typeDefs;
