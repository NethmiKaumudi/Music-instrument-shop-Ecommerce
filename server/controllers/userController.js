
// const User = require('../models/userModel');
// const bcrypt = require('bcryptjs');

// const signup = async (req, res) => {
//     try {
//         const { name, username, email, password, role } = req.body;

//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username is already taken' });
//         }

//         const user = new User({ name, username, email, password, role });
//         await user.save();
//         const token = await user.generateAuthToken();
//         res.status(201).json({ user, token });
//     } catch (error) {
//         res.status(400).json({ message: error.message || 'Error during signup' });
//     }
// };

// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const userFound = await User.findOne({ username });
//         if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
//             return res.status(400).json({ message: 'Invalid login credentials' });
//         }
//         const token = await userFound.generateAuthToken();
//         const role = userFound.role;
//         res.json({ user: userFound, token, role });
//     } catch (error) {
//         res.status(500).json({ message: error.message || 'Login failed' });
//     }
// };

// module.exports = { signup, login };
// controllers/userController.js

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    const user = new User({ name, username, email, password, role });
    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error during signup' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ message: 'Invalid login credentials' });
    }

    const token = user.generateAuthToken();
    res.json({ user, token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

module.exports = { signup, login };

