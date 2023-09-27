const mongoose = require('mongoose');

const magicWordsSchema = new mongoose.Schema({
  Keyword: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Example: String,
});

module.exports = mongoose.model('MagicWords', magicWordsSchema);
