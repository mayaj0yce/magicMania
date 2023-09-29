const mongoose = require('mongoose');

const magicDecksSchema = new mongoose.Schema({
  cardName: {
    type: String,
    quantity: Number
  }
});

module.exports = mongoose.model('MagicDeck', magicDecksSchema);
