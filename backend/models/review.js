const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Review', reviewSchema);