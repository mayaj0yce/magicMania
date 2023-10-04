const { gql } = require('apollo-server-express');
const Card = require('../../db/models/card'); // Import your Mongoose Card model
const authenticateToken = require('../middleware/auth');

const resolvers = {
  Mutation: {
    saveCard: async (_, { name, imageUrl }, { user }) => {
      // Verify user's authentication and get the user's ID from the token
      if (!user) {
        throw new AuthenticationError('User not authenticated');
      }
      
      const userId = user.id;

      // Create and save the card in the database
      const card = new Card({
        name,
        imageUrl,
        userId,
      });

      await card.save();

      return card;
    },
  },
};
