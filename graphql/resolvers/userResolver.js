const User = require('../../db/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express'); // Import AuthenticationError from the GraphQL server library

const resolvers = {
  Mutation: {
    createUser: async (_, { input }) => {
      const { username, email, password } = input;

      // Hash the user's password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const newUser = new User({
          username,
          email,
          passwordHash: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser);

        return {
          user: savedUser,
          token,
        };
      } catch (error) {
        // Handle any database or validation errors here
        throw new Error('Error creating user');
      }
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('User not found');
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = generateToken(user);

      return {
        user,
        token,
      };
    },
  },
  Query: {
    getUser: (_, { id }) => {
      return User.findById(id);
    },
    // Add more queries here if needed
  },
};

function generateToken(user) {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      // Add more user data to the token payload if needed
    },
    process.env.JWT_SECRET, // Use an environment variable for the secret key
    { expiresIn: '1h' }
  );
  return token;
}

module.exports = resolvers;
