import { generateJWT } from "../components/generateJWT.js";
import { hashPassword } from "../components/hashPassword.js";
import { validatePassword } from "../components/validatePassword.js";
import { neoSchema } from "../configs/neo4j.config.js";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config.js";
import { validateUser } from "../components/validateUser.js";

const resolvers = {
  Query: {
    allTask: async (_, args, { req }) => {
      console.log(req.headers.token);
    },
  },
  Mutation: {
    signup: async (_, args) => {
      const { username, email, password } = args;
      const session = neoSchema.driver.session();

      const query = `
        MATCH (u:User {email: $email})
        RETURN u
      `;
      const checkExistUser = await session.run(query, { email });
      if (checkExistUser.records.length !== 0)
        throw new Error("User already exist!");

      const id = uuidv4();
      const hashedPassword = await hashPassword(password);
      const result = await session.run(
        `CREATE (u:User {id: $id, username: $username, email: $email, password: $hashedPassword}) RETURN u`,
        { id, username, email, hashedPassword }
      );

      session.close();
      const user = result.records[0].get("u").properties;
      const token = generateJWT(user);
      return { token, user };
    },
    login: async (_, args) => {
      const { email, password } = args;
      const session = neoSchema.driver.session();

      try {
        const query = `
          MATCH (u:User {email: $email})
          RETURN u
        `;
        const result = await session.run(query, { email });

        if (result.records.length === 0)
          throw new Error("This email doesn't exist!");

        const user = result.records[0].get("u").properties;

        const checkPassword = await validatePassword(password, user.password);
        if (!checkPassword) throw new Error("Invalid password");

        // Set the token as a cookie in the response
        const token = generateJWT(user);

        return { token, user };
      } finally {
        session.close();
      }
    },
    addTask: async (_, args, { req }) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const userId = validateUser(token);

        const { title, description } = args;
        const id = uuidv4();
        const session = neoSchema.driver.session();

        const query = `
          CREATE (t:Task {id: $id, title: $title, description: $description, isCompleted: false})
          WITH t
          MATCH (u:User {id: $userId})
          CREATE (u)-[:TODO]->(t)
          RETURN t
        `;

        const result = await session.run(query, {
          id,
          title,
          description,
          userId,
        });
        session.close();
        return result.records[0].get("t").properties;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default resolvers;
