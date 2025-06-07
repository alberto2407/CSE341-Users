const mongoose = require('mongoose');

const UserShema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String
});

UserShema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', UserShema);