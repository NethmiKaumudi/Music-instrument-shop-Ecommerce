const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // Add username field
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
    // tokens: [{
    //     token: { type: String, required: true }
    // }]
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// userSchema.methods.generateAuthToken = async function () {
//     const token = jwt.sign({ _id: this._id.toString(), role: this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     this.tokens = this.tokens.concat({ token });
//     await this.save();
//     return token;
// };


const User = mongoose.model('User', userSchema);

module.exports = User;
