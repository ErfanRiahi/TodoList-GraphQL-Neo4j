// Import the neo4j driver and other required dependencies
const neo4j = require("neo4j-driver");
require("dotenv").config();

const URI = process.env.NEO4J_URI;
const USER = process.env.NEO4J_USER;
const PASSWORD = process.env.NEO4J_PASSWORD;

describe("Neo4j Connection", () => {
  let driver;

  beforeAll(() => {
    // Create a neo4j driver instance before running the tests
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
  });

  afterAll(() => {
    // Close the driver after all tests are done to prevent resource leaks
    driver.close();
  });

  it("should connect to Neo4j and run a simple query", async () => {
    try {
      const session = driver.session();
      const result = await session.run("RETURN 1 as num");
      session.close();

      // Check if the query result is as expected
      expect(result.records[0].get("num").toNumber()).toBe(1);
    } catch (error) {
      if (error.code === "ServiceUnavailable") {
        throw new Error(
          "Connection to Neo4j server is not provided. Make sure the database is running."
        );
      } else {
        throw error;
      }
    }
  });
});
