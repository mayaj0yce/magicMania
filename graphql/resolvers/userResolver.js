const User = require('../../db/models/user');
const bycrypt = require('bycrypt');
const jwt = require('jsonwebtoken');

const resolvers = {
    Mutation: {
        createUser: async (_, { input }) => {
            const { username, email, password } = input;
            // Hash the user's password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);
      
            const newUser = new User({
              username,
              email,
              passwordHash: hashedPassword,
            
            });

            const savedUser = await newUser.save();

            const token = generateToken(savedUser);

            return {
                user: savedUseer,
                token,
            };
    },
    login: async (_, { username, password }) => {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Incorrect passsword<insert Evil laugh>');
        }

        const token = generateToken(user);

        return {
            user,
            token,
        };
    },
    Query: {
        getUser: (_, { id }) => {
            return User.findbyId(id);
        },
        // moreeeeee?
    },
},
};

function generateToken(user) {
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        'superrrrsecret',
        { expiresIn: '1h'}
    );
    return token;
}

module.export = resolvers;