const { gql } = require('apollo-server-express');

const userSchema = gpl`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    input CreateUserInput {
        username: String!
        email: String!
        password: String!
    }

    type AuthPayload {
        user: User
        token: String
    }

    type Mutation {
        createUser(input: CreateUserInput!): AuthPayload
        login(username: String!, password: String!): AuthPayload
    }

    type Query {
        getUser(id: ID!): User
    }
    `;

    module.exports = userSchema;