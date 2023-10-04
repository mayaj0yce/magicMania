import { gql } from '@apollo/client';

// Define the CREATE_KEYWORD mutation
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

// Define the CREATE_USER mutation
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

// Define the LOGIN_USER mutation
export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
        email
        # Add more user fields as needed
      }
      token
    }
  }
`;

// Define the SAVE_CARD mutation
export const SAVE_CARD = gql`
  mutation SaveCard($input: SaveCardInput!) {
    saveCard(input: $input) {
      id
      name
      imageUrl
      user {
        id
      }
    }
  }
`;

export const DELETE_USER_CARD = gql`
mutation($cardId: ID!) {
  deleteUserCard(cardId: $cardId) {
    id
    name
    imageUrl
    # Add any other fields you want to return after deletion
   }
  }
`;