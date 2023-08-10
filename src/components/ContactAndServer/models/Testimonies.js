const mongoose = require('mongoose');

const TestimonySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  testimonies: [
    {
      testimonyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    }
  ]
});

const TestimonialModel = mongoose.model("Testimonials", TestimonySchema, "Testimonials");

module.exports = TestimonialModel;
