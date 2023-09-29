const mongoose = require('../connection'); // Import your mongoose setup
const user = require('../models/user'); // Import your Mongoose model

const initialData = [
    {
        username: 'usernameExample',
        email: 'example@example.com',
        password: 'password',
        decks: [],
    }
]

async function seedDatabase() {
    try {
      await user.deleteMany(); // Clear existing data
      await user.insertMany(initialData); // Insert new data
      console.log('Seeding complete! 🌱');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      mongoose.connection.close(); // Close the database connection
    }
  };

seedDatabase();
