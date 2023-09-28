const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type MagicWords {
    id: ID!
    Keyword: String!
    Description: String!
    Example: String
  }

  type Query {
    magicWords: [MagicWords]
  }
`;

module.exports = typeDefs;
