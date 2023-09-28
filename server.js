const express = require('express');
const app = express();
const port = process.env.PORT || 3001; 

// Middleware to parse JSON requests
app.use(express.json());

// Define API routes here

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// Serve your React app's static files (build) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build')); // Replace 'client/build' with build folder
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
