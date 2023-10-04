const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true, // This field is required, modify as needed
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
