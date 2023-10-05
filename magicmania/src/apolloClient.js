import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create a function to get the token from localStorage
const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('authToken');
  return token ? `Bearer ${token}` : '';
};

// Create an HTTP link to your GraphQL server with a dynamic Authorization header
const httpLink = createHttpLink({
  uri: '/graphql', // Set your server's GraphQL endpoint
  headers: {
    Authorization: getTokenFromLocalStorage(), // Set the Authorization header dynamically
  },
});

// Create an Apollo Client
const client = new ApolloClient({
  link: httpLink, // Use the HTTP link directly
  cache: new InMemoryCache(),
});

export default client;
