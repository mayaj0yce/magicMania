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
          password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser);

        return {
          user: savedUser,
          token,
        };
      } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000 && error.keyPattern && error.keyValue) {
          // Duplicate username error
          throw new Error('Username is already taken.');
        } else {
          // Handle other errors
          console.error('Error creating user:', error);
          throw new Error('Error creating user');
        }
      }
    },
    login: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          throw new AuthenticationError('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Input Password:', password);
        console.log('User Password Hash:', user.password);

        if (!passwordMatch) {
          throw new AuthenticationError('Incorrect password');
        }

        const token = generateToken(user);

        return {
          user,
          token,
        };
      } catch (error) {
        console.error('Error during login:', error);
        throw new AuthenticationError('Authentication failed');
      }
    }
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
