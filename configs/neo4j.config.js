import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { typeDefs } from "../graphql/typeDefs.js";
import resolvers from "../graphql/resolvers.js";

//  Read authentication data from env file
const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USER;
const PASSWORD = process.env.NEO4J_PASSWORD;

//  Config neo4j driver to connect our database
const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
const serverInfo = await driver.getServerInfo();
console.log(serverInfo);

//  Create an instance of neo4jGraphql
const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });

export { neoSchema };
