const Card = require('../../db/models/cards'); // Import your Card model

const resolvers = {
  Query: {
    getUserCards: async (_, { userId }) => {
      try {
        // Fetch cards from the database based on userId
        const userCards = await Card.find({ userId });
        return userCards;
      } catch (error) {
        throw new Error('Error fetching user cards');
      }
    },
    // Other query resolvers...
  },
  // Other resolvers...
};

module.exports = resolvers;
