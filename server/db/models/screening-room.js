const mongoose = require('mongoose');

const seat = new mongoose.Schema({
  row: { type: String, required: true },
  number: {
    type: Number,
    required: true,
    validate: {
      validator: x => Number.isInteger(x) && x > 0,
      message: props => `${props.value} is not an positive integer value!`,
    },
  },
});

seat.virtual('seat_code').get(function() {
  return `${this.row},${this.number}`;
});

const schema = new mongoose.Schema({
  _id: {
    type: String,
    alias: 'name',
  },
  seats: [seat],
});

module.exports.ScreeningRoom = mongoose.model('ScreeningRoom', schema);
