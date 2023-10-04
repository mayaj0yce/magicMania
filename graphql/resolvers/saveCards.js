const Card = require('../../db/models/cards'); // Import your User and Card models
const User = require('../../db/models/user');

const saveCard = async (_, { cardId }, { user }) => {
  try {
    if (!user) {
      throw new Error('Authentication required');
    }

    // Find the user by their ID
    const currentUser = await User.findById(user.id);

    if (!currentUser) {
      throw new Error('User not found');
    }

    // Check if the card is already saved by the user
    const alreadySaved = currentUser.cards.some((card) => card.toString() === cardId);

    if (alreadySaved) {
      throw new Error('Card already saved');
    }

    // Create a new card document and save it to the database
    const newCard = new Card({
      _id: cardId, // Assuming cardId is a valid ID for the card
      user: currentUser,
    });

    await newCard.save();

    // Add the card's ID to the user's list of saved cards
    currentUser.cards.push(newCard);
    await currentUser.save();

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
