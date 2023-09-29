const { gql } = require('apollo-server-express');

const typeDefs = gql`
type MagicWord {
  Keyword: String
  Description: String
  Example: String
}

type Query {
  magicWords: [MagicWord]
  searchKeyword(keyword: String!): MagicWord
}
`;

module.exports = typeDefs;
