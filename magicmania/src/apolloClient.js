import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import GetUser from './utils/auth'

// Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Set your server's GraphQL endpoint
  headers: {
    Authorization: `Bearer ${GetUser.getToken()}`, // Get the token from storage
  },
});

// Create an Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
