const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/lostFoundDB');

const signupSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    joiningDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',signupSchema);