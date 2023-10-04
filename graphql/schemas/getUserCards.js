const { gql } = require('apollo-server-express');

const getCardSchema = gql`
type Card {
    id: ID!
    name: String!
    imageUrl: String
    userId: String
    # Add other card fields as needed
  }
  
  type Query {
    getUserCards(userId: String!): [Card]
  }

  type Mutation {
    deleteUserCard(cardId: ID!): Card
  }
`;

module.exports = getCardSchema;
