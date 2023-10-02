const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  cardName: {
    type: String,
    quantity: Number
  }
});

module.exports = mongoose.model( deckSchema);
