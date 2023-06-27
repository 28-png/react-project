const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  testimonyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const TestimonialModel = mongoose.model("Testimonials", TestimonialSchema, "Testimonials");

module.exports = TestimonialModel;
