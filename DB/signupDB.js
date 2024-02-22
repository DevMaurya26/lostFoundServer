const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:user@cluster0.339bpnm.mongodb.net/');

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