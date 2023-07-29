export const typeDefs = `#graphql
    type Member {
        id: ID!
        name: String!
        email: String!
        password: String!
        tasks: [Task!]! @relationship(type: "TODO", direction: OUT)
    }

    type Task {
        id: ID!
        title: String!
        description: String
        isCompleted: Boolean!
        member: [Member!]! @relationship(type: "TODO", direction: IN)
    }
`;
