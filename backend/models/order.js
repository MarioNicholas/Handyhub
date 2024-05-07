const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceID: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  }
});

module.exports = mongoose.model('Order', tra);
