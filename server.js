const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Import typeDefs and resolvers
const typeDefs = require('./graphql/schemas/typeDefs');
const resolvers = require('./graphql/resolvers/magicWordResolver');
const userResolvers = require('./graphql/resolvers/userResolver');
const cardResolvers = require('./graphql/resolvers/saveCards');
const getCardsResolvers = require('./graphql/resolvers/getUserCards');
const userShema = require('./graphql/schemas/userSchema');
const cardSchema = require('./graphql/schemas/saveCards');
const getCardSchema = require('./graphql/schemas/getUserCards');
const deleteUserCard = require('./graphql/resolvers/deleteUserCard');
const authenticateToken = require('./graphql/middleware/auth');

const mongoose = require('./db/connection');
require('dotenv').config();

// Create an instance of Express
const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON requests
app.use(express.json());

app.use((req, res, next) => {
  console.log('Received request:', req.body);
  next();
});

// Combine your schemas (typeDefs) and resolvers into one
const combinedResolvers = [resolvers, userResolvers, cardResolvers, getCardsResolvers, deleteUserCard];
const combinedTypeDefs = [typeDefs, userShema, cardSchema, getCardSchema];

// Create an instance of Apollo Server
const server = new ApolloServer({
  typeDefs: combinedTypeDefs,
  resolvers: combinedResolvers,
  context: ({ req }) => {
    // Extract the user information from the request
    const user = req.user;
    return { user };
  },
});

// Start the Apollo server and then Apply the Apollo Server instance as middleware to Express
server.start().then(() => {
  server.applyMiddleware({ app });
});

// Serve your React app's static files (build) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './magicmania/build')));

  // Express serve up index.html file if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './magicmania/build', 'index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
