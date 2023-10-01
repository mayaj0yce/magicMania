// const mongoose = require('../connection');
// const fs = require('fs');
// const path = require('path');
// const magicWordSeed = require('./magicWordsSeed');
// const userSeed = require('./userSeed');


// const db = mongoose.connection;

// // Define a function to run seed files
// const runSeedFiles = async () => {
//     try {
//       // Require and run your seed files here
//       require('./magicWordsSeed'); // Adjust the path to your seed files
//       require('./userSeed'); // Adjust the path to your seed files
  
//       console.log('All seed files executed successfully.');
  
//       // Close the database connection when done
//       mongoose.connection.close();
//     } catch (error) {
//       console.error('Error running seed files:', error);
//       mongoose.connection.close();
//     }
//   };
  
//   // Run the seed files
//   runSeedFiles();