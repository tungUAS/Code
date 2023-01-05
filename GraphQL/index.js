const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const DataLoader = require("dataloader");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { graphqlUploadExpress } = require("graphql-upload");
const express = require("express");

const db = require("./models/index");
const Author = db.author;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        authorLoader: new DataLoader(async (keys) => {
          const authors = await Author.find({});

          const authorMap = {};

          authors.forEach((author) => {
            authorMap[author.name] = author;
          });

          return keys.map((key) => authorMap[key]);
        }),
        req
      };
    }
  });

  await server.start();

  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

/*   mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MongoDB connected 444");
      return app.listen({ port: 5000 });
    })
    .then((res) => {
      console.log("server running at port 5000...");
    }); */

    mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return app.listen({ port: 5000 });
  })
  .then((res)=>{
    console.log("server running at port 5000...")
  })
}

startServer();
