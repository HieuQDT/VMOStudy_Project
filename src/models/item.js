const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    barcode: {
        type: String,
        unique: true,
        minLength: 6,
        maxLength: 10,
    },
    inputPrice: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
    },
    avatar: {
        type: String,
        required: true,
    },
    detailAvatar: {
        type: String,
        required: true,
    },
    itemDescription: {
        type: String,
    },
    stockAmount: {
        type: Number,
        required: true,
    },
    itemCategory: {
        type: String,
    },
});

module.exports = mongoose.model('Items', itemSchema);