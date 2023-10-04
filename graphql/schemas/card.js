const { gql } = require('apollo-server-express');

const cardsSchema = gql`
type Card {
    # Define the fields of the Card type
    id: ID!
    name: String!
    imageUrl: String!
    # Add other fields as needed
  }
  
  # Define your Mutation type and include the saveCard mutation
  type Mutation {
    saveCard(name: String!, imageUrl: String!): Card
  }
  
`;

module.exports = cardsSchema;
