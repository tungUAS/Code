const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dbConfig = require('./config/db.config');
const DataLoader = require('dataloader');

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const db = require("./models/index");
const Author = db.author;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    return {
      authorLoader: new DataLoader(async keys => {
        const authors = await Author.find({});

        const authorMap = {};

        authors.forEach(author => {
          authorMap[author.name] = author;
        });

        return keys.map(key => authorMap[key]);
      })
    }
  }
});

mongoose
  .connect(`${dbConfig.URL_MONGODB_ATLAS}`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected 444");
    return server.listen({ port: 5000 });
  })
  .then((res)=>{
    console.log("server running at port 5000...")
  })
