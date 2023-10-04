const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: String,
  userId: {
    type: String, // Change the type to String
    required: true,
  },
});

module.exports = mongoose.model('Card', cardSchema);
