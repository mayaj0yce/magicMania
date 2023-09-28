// seed.js

const mongoose = require('../connection'); // Import your mongoose setup
const MagicWords = require('../models/magicWords'); // Import your Mongoose model

// Data to be inserted into the database
const initialData = [
  {
    Keyword: 'Adamant',
    Description:
      "Spells with Adamant have additional or alternative effects if you cast the spell with three or more mana of one color. The text is different on each color of spell, as colored spells specify the spell's color whereas the two artifact spells outline that any color can be used.",
    Example: 'If at least three red mana was spent to cast this spell, it deals 4 damage instead.',
  },
  {
    Keyword: 'Abandon',
    Description:
      'Only used in Archenemy format. To turn a face-up ongoing scheme card face down and put it on the bottom of its owner\'s scheme deck.',
  },
  {
    Keyword: 'Absorb',
    Description:
      'Absorb was introduced in Future Sight. By its nature as a damage prevention ability, this is a white ability. It has only been printed on one card so far, the timeshifted Lymph Sliver. It ended up being a little too powerful and stalled the game too much to reuse in greater number.',
    Example: 'If a source would deal damage to a Sliver, prevent 1 of that damage.',
  },
];

// Seed the database
async function seedDatabase() {
  try {
    await MagicWords.deleteMany(); // Clear existing data
    await MagicWords.insertMany(initialData); // Insert new data
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDatabase();
