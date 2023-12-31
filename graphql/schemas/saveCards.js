const { gql } = require('apollo-server-express');

const cardSchema = gql`
  type Card {
    id: ID!
    name: String!
    imageUrl: String
    user: User
  }
  
  type Mutation {
    saveCard(input: SaveCardInput!): Card
  }
  
  input SaveCardInput {
    cardId: String!
    userId: String! # Include userId
    imageUrl: String! # Include imageUrl
    name: String! # Include name
  }
`;

module.exports = cardSchema;
