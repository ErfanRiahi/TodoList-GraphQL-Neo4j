import path, { dirname } from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());

//  Load graphql type definition from schema.graphql
const __dirname = dirname("./schema.graphql");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf-8"
);

//  Read authentication data from env file
const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USER;
const PASSWORD = process.env.NEO4J_PASSWORD;

//  Config neo4j driver to connect our database
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
const serverInfo = await driver.getServerInfo();
console.log(serverInfo);

//  Create an instance of neo4jGraphql
const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

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
