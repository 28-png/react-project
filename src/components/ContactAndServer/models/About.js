const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
});

const AboutModel = mongoose.model("About", AboutSchema, "About");


module.exports = AboutModel;