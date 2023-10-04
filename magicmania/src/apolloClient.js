import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const userToken = localStorage.getItem('token'); // Get the user's token from local storage
// Create an HTTP link to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Set the server endpoint to your GraphQL server
});

// Create an Apollo Client
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  headers: {
    Authorization: userToken ? `Bearer ${userToken}` : '', // Include the user's token with "Bearer" prefix
  },
});

export default client;
