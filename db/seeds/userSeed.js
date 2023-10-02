//userSeed

const mongoose = require('../connection'); // Import your mongoose setup
const User = require('../models/user'); // Import your Mongoose model
const bcrypt = require('bcrypt');

// Define a function to seed user data
const userData = [
  {
    username: 'flapjack',
    email: 'flapjacks@example.com',
    password: 'iloveflapjacks'
  },
  {
    username: 'waffles',
    email: 'waffles@example.com',
    password: 'ilovewaffles'
  },
  {
    username: 'pancakes',
    email: 'pancakes@example.com',
    password: 'ilovepancakes'
  },
];

async function seedDatabase() {
  try {
    await User.deleteMany(); // Clear existing data
    await User.insertMany(userData); // Insert new data
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}



seedDatabase();
