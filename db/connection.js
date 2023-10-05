const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://hwmelander:<password>@cluster0.rr7k0xr.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://localhost/magic_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  // You can run your seeding script here, after the connection is established
  require('./seeds/index');
});

module.exports = mongoose;
