const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userID: {
        type: String,
    },
    orderContent: {
        type: [Object],
    },
    voucherName: {
        type: String,
    },
    totalPrice: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);