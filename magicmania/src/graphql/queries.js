import { gql } from '@apollo/client';

export const SEARCH_KEYWORD = gql`
  query SearchKeyword($keyword: String!) {
    searchKeyword(keyword: $keyword) {
      Keyword
      Description
      Example
    }
  }
`;
