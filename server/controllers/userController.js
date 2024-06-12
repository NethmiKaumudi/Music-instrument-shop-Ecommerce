const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { name, username, email, password, role } = req.body;

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'Username is already taken' });
        }

        const user = new User({ name, username, email, password, role });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};


// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;
//         const userFound = await User.findOne({ username });
//         if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
//             return res.status(400).send({ error: 'Invalid login credentials' });
//         }
//         // const token = await userFound.generateAuthToken(); // Use generateAuthToken method
//         const role = userFound.role;
//         res.send({ user: userFound, token, role });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userFound = await User.findOne({ username });
        if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const role = userFound.role;

        res.send({ user: userFound, role }); // Removed token from the response
    } catch (error) {
        res.status(500).send(error);
    }
};



module.exports = { signup, login };
