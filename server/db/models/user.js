const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserRole = Object.freeze({ ADMIN: 'admin', USER: 'user' });

const userSchema = new mongoose.Schema({
   email:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 256,
    unique: true
   },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, 'jwtPrivateKey');
  return token;
};
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email({ minDomainAtoms: 2 }),
    password: Joi.string()
      .min(5)
      .required(),
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.UserRole = UserRole;
exports.validate = validateUser;

