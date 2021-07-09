/* eslint-disable eqeqeq */
const Item = require('../models/item');
const pageSortMiddleware = require('../middlewares/pageSort');
const _ = require('lodash');

///////////////////////////////////// GET ITEMS
const itemGetall = async (name, pageNumber, pageSize) => {
    try {
        // GET ONE ITEM
        if (name) {
            const findOne = await Item.findOne({ 'name': { $eq: name } });
            if (findOne) return findOne;
        }
        // GET ALL ITEMS
        const itemGet = await Item.find();
        // SORT ITEM DATABASE
        const sortedItem = _.sortBy(itemGet, 'name');
        // SORT THE PAGE
        const sortedPage = pageSortMiddleware.pageSort(sortedItem, pageNumber, pageSize);
        return sortedPage;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// CREATE ITEM
const itemCreate = async (object) => {
    try {
        // CREATE ITEM
        const items = new Item({
            name: object.name,
            barcode: object.barcode,
            inputPrice: object.inputPrice,
            salePrice: object.salePrice,
            weight: object.weight,
            avatar: object.avatar,
            detailAvatar: object.detailAvatar,
            itemDescription: object.itemDescription,
            stockAmount: object.stockAmount,
            itemCategory: object.itemCategory,
        });
        const newItem = await items.save();
        return newItem;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// DELETE ITEM
const itemDelete = async (output) => {
    try {
        const deletedItem = await output.remove();
        return deletedItem;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// UPDATE ITEM
const itemUpdate = async (input, output) => {
    try {
        if (input.name != null) {
            output.name = input.name;
        }
        if (input.barcode != null) {
            output.barcode = input.barcode;
        }
        if (input.inputPrice != null) {
            output.inputPrice = input.inputPrice;
        }
        if (input.salePrice != null) {
            output.salePrice = input.salePrice;
        }
        if (input.weight != null) {
            output.weight = input.weight;
        }
        if (input.avatar != null) {
            output.avatar = input.avatar;
        }
        if (input.detailAvatar != null) {
            output.detailAvatar = input.detailAvatar;
        }
        if (input.itemDescription != null) {
            output.itemDescription = input.itemDescription;
        }
        if (input.stockAmount != null) {
            output.stockAmount = input.stockAmount;
        }
        if (input.itemCategory != null) {
            output.itemCategory = input.itemCategory;
        }
        const updatedItem = await output.save();
        return updatedItem;
    } catch (err) {
        throw Error('Unexpected error');
    }
};
///////////////////////////////////// EXPORT MODULES
const services = {
    itemGetall,
    itemCreate,
    itemDelete,
    itemUpdate,
};
module.exports = services;