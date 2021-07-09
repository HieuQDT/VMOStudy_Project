const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    voucherName: {
        type: String,
        required: true,
    },
    percentDiscount: {
        type: Number,
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
    itemName: {
        type: String,
    },
});

module.exports = mongoose.model('Voucher', voucherSchema);

