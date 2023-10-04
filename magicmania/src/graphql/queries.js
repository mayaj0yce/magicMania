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

export const GET_USER_CARDS = gql`
  query GetUserCards($userId: String!) {
    getUserCards(userId: $userId) {
      id
      name
      imageUrl
      # Add other card fields as needed
    }
  }
`;