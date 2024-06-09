const User = require('../models/user');
const bcrypt = require('bcryptjs');

signup = async (req, res) => {
    try {
        const { name, username, email, password, role } = req.body;
        const user = new User({ name, username, email, password, role });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};
login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userFound = await User.findOne({ username });
        if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
            return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = await userFound.generateAuthToken();
        res.send({ user: userFound, token });
    } catch (error) {
        res.status(500).send(error);
    }
};
module.exports = { signup, login };
