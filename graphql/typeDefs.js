export const typeDefs = `#graphql
    type User {
        id: ID
        username: String!
        email: String!
        password: String!
        tasks: [Task!]! @relationship(type: "TODO", direction: OUT)
    }

    type Task {
        id: ID
        title: String!
        description: String
        isCompleted: Boolean!
        user: [User!]! @relationship(type: "TODO", direction: IN)
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        allTasks: [Task]
    }

    type Mutation {
        signup( username: String!, email: String!, password: String!) : AuthPayload
        login(email: String!, password: String!) : AuthPayload
        addTask(title: String!, description: String, userId: ID) : Task
        deleteTask(taskId: ID!) : Task
        editTask(taskId: ID!, title: String, description: String, isCompleted: Boolean) : Task
    }

`;
