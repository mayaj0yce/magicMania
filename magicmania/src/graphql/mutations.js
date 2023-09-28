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
