const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    list: {
        type: [String],
        required: true,
    }
});

const ServicesModel = mongoose.model("Services", ServicesSchema, "Services");


module.exports = ServicesModel;