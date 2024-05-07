const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const providerSchema = new Schema({
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Provider', providerSchema);