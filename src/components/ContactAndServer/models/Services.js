const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  businessHeader: {
    type: String,
    required: true,
  },
  businessDescription: {
    type: String,
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
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

const ServicesModel = mongoose.model("Services", ServicesSchema, "Services");

module.exports = ServicesModel;
