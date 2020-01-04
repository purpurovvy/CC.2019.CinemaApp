const Joi = require('joi');
const mongoose = require('mongoose');
const { Movie } = require('./movie');

const seat = new mongoose.Schema({
  _id: {
    type: String,
    alias: 'code',
  },
  ticket: { type: mongoose.Types.ObjectId, ref: 'Ticket', default: null },
});

const schema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Movie,
    required: true,
  },
  price: { type: mongoose.Types.Decimal128, required: true },
  screeningRoom: {
    name: { type: String, required: true },
    seats: [seat],
  },
});

function validateShow(show) {
  const schema = {
    startDate: Joi.date()
      .min(4)
      .max(20)
      .required(),
    endDate: Joi.date()
      .min(4)
      .max(20)
      .required(),
  };

  return Joi.validate(show, schema);
}

exports.Show = mongoose.model('Show', schema);
exports.validate = validateShow;
