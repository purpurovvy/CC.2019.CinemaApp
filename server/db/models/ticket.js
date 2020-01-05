const mongoose = require('mongoose');
const { User } = require('./user');
const {ScreeningRoom} = require('./screening-room')

const TicketType = Object.freeze({ TICKET: 'ticket', RESERVATION: 'reservation' });
const TicketStatus = Object.freeze({ PENDING: 'pending', REALIZED: 'realized' });

const schema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: User, required: true },
  show: { type: mongoose.Types.ObjectId, ref: 'Show', required: true },
  type: { type: String, enum: [TicketType.TICKET, TicketType.RESERVATION], required: true },
  status: {
    type: String,
    enum: [TicketStatus.PENDING, TicketStatus.REALIZED],
    required: true,
    default: TicketStatus.PENDING,
  },
  price: { type: mongoose.Types.Decimal128, required: true },
  
});

module.exports.Ticket = mongoose.model('Ticket', schema);
module.exports.TicketType = TicketType;
module.exports.TicketStatus = TicketStatus;
