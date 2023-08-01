import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { neoSchema } from "./configs/neo4j.config.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(cors());

// app.use(
//   "/",
//   bodyParser.json(),
//   graphqlExpress((_, res) => ({
//     schema,
//     context: { res },
//   }))
// );

//  Create an instance of ApolloServer
const server = new ApolloServer({
  schema: await neoSchema.getSchema(),
});

//  Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs our ApolloServer instance as middleware
//  3. prepares our app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ req }),
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at ${url}`);
