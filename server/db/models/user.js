const mongoose = require('mongoose');

const UserRole = Object.freeze({ ADMIN: 'admin', USER: 'user' });

const schema = new mongoose.Schema({
  _id: {
    type: String,
    alias: 'email',
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    // required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: [UserRole.ADMIN, UserRole.USER],
    required: true,
    default: UserRole.USER,
  },
  wallet: {
    type: mongoose.Types.Decimal128,
    required: true,
    default: 0,
  },
  // tickets
});

module.exports.User = mongoose.model('User', schema);
module.exports.UserRole = UserRole;
