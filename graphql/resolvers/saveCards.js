const Card = require('../../db/models/cards'); // Import your Card model

const saveCard = async (_, { input }) => {
  try {
    // Extract input data
    const { userId, imageUrl, name } = input;

    // Create and save the card document with the associated userId, imageUrl, and name
    const newCard = new Card({
      userId, // Ensure that userId is correctly set
      imageUrl,
      name,
      // Other card properties if needed
    });

    await newCard.save();

    return newCard;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Mutation: {
    saveCard,
  },
};

