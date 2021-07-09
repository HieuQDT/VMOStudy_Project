const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    bannerImage: {
        type: String,
    },
    index: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Category', categorySchema);

