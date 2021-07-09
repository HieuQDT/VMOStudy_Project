const mongoose = require ('mongoose');

const fsaleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    itemID: {
        type: String,
        required: true,
    },
    itemName:{
        type: String,
    },
    percentDiscount: {
        type: Number,
        required: true,
        min: 1,
        max: 99,
    },
});

module.exports = mongoose.model('flashSale', fsaleSchema);

