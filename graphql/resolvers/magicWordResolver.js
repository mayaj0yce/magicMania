const MagicWord = require('../../db/models/magicWords');

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
    searchKeyword: async (_, { keyword }) => {
      try {
        const magicWord = await MagicWord.findOne({ Keyword: keyword });
        return magicWord;
      } catch (error) {
        throw new Error('Error fetching magic word by keyword: ' + error);
      }
    },
  },
};

module.exports = resolvers;
