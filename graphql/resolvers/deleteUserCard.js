const Card = require('../../db/models/cards'); // Import your Card model

const resolvers = {
  Mutation: {
    deleteUserCard: async (_, { cardId }) => {
      try {
        // Find the card by ID
        const deletedCard = await Card.findByIdAndRemove(cardId);

        if (!deletedCard) {
          throw new Error('Card not found');
        }

        return deletedCard;
      } catch (error) {
        throw new Error(`Error deleting card: ${error.message}`);
      }
    },
    // Other mutation resolvers...
  },
  // Other resolvers...
};

module.exports = resolvers;
