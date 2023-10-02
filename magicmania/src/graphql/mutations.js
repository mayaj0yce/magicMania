import { gql } from '@apollo/client';

export const CREATE_KEYWORD = gql`
  mutation CreateKeyword($input: KeywordInput!) {
    createKeyword(input: $input) {
      id
      Keyword
      Description
      Example
    }
  }
`;

export const ADD_CARD = gql`
mutation addCard($profileId: ID!, $card: )

`