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

// export const ADD_CARD = gql`
// mutation addCard($profileId: ID!, $card: )


