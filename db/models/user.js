const mongoose = require('mongoose');

const  userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    decks: [
        {
          name: String,
          cards: [
            {
              cardName: String,
              quantity: Number,
            },
          ],
        },
      ],
    });


const user = mongoose.model('User', userSchema);

module.exports = User;