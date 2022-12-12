const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dbConfig = require('./config/db.config');

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
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
