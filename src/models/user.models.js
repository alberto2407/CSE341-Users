const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', UserShema);