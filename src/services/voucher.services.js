/* eslint-disable eqeqeq */
const Voucher = require('../models/voucher');
const Item = require('../models/item');
const _ = require('lodash');
const pageSortMiddleware = require('../middlewares/pageSort');

///////////////////////////////////// GET ALL FLASH SALE
const voucherGetall = async (name, pageNumber, pageSize) => {
    try {
        // GET ONE VOUCHER
        if (name) {
            const findOne = await Voucher.find({ 'voucherName': { $eq: name } });
            if (findOne) return findOne;
        }
        // GET ALL VOUCHER
        const voucherGet = await Voucher.find();
        // SORT DATABASE
        const sortedVoucher = _.sortBy(voucherGet, 'name');
        // SORT THE PAGE
        const sortedPage = pageSortMiddleware.pageSort(sortedVoucher, pageNumber, pageSize);
        return sortedPage;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// CREATE FLASH SALE
const voucherCreate = async (object) => {
    try {
        const itemGet = await Item.findOne({ '_id': { $eq: object.itemID } });
        // CREATE FLASH SALE
        const voucher = new Voucher({
            voucherName: object.voucherName,
            percentDiscount: object.percentDiscount,
            endDate: object.endDate,
            itemID: object.itemID,
            itemName: itemGet.name,
        });
        const newVoucher = await voucher.save();
        return newVoucher;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// DELETE FLASH SALE
const voucherDelete = async (output) => {
    try {
        const deletedVoucher = await output.remove();
        return deletedVoucher;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// UPDATE FLASH SALE
const voucherUpdate = async (input, output) => {
    try {
        if (input.voucherName != null) {
            output.voucherName = input.voucherName;
        }
        if (input.percentDiscount != null) {
            if (input.percentDiscount <= 0 || input.percentDiscount >= 100) return { messenge: 'Invalid changes' };
            output.percentDiscount = input.percentDiscount;
        }
        const updatedFsale = await output.save();
        return updatedFsale;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// EXPORT MODULES
const services = {
    voucherGetall,
    voucherCreate,
    voucherDelete,
    voucherUpdate,
};
module.exports = services;