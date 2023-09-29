const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('./db/connection');

// Import typeDefs and resolvers
const typeDefs = require('./graphql/schemas/typeDefs');
const resolvers = require('./graphql/resolvers/magicWordResolver');
const userResolvers = require('./graphql/resolvers/userResolver');
const useerShema = require('./graphql/schemas/userSchema');

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3001; 

// Middleware to parse JSON requests
app.use(express.json());

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo server and then Apply the Apollo Server instance as middleware to Express
server.start().then(() => {
  server.applyMiddleware({ app });
});

// Define API routes here

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Serve your React app's static files (build) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); // Replace 'client/build' with build folder
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
