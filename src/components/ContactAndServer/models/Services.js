const mongoose = require('mongoose');

const BusinessAreaSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  list: {
    type: [String],
    required: true,
  },
});

const ServicesSchema = new mongoose.Schema({
  businessHeader: {
    type: String,
    required: true,
  },
  businessBody: {
    type: String,
    required: true,
  },
  businessAreas: [BusinessAreaSchema],
});

const ServicesModel = mongoose.model('Services', ServicesSchema, 'Services');

module.exports = ServicesModel;
