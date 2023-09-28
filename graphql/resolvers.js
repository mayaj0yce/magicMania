const MagicWord = require('../db/models/magicWords');

const resolvers = {
  Query: {
    magicWords: async () => {
      try {
        const magicWords = await MagicWord.find();
        return magicWords;
      } catch (error) {
        throw new Error('Error fetching magic words: ' + error);
      }
    },
  },
};

module.exports = resolvers;
