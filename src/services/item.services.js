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
        const { name, barcode, inputPrice, salePrice, weight, avatar, detailAvatar, itemDescription, stockAmount, itemCategory } = input;
        // SET RESULTS TO OUTPUT
        output.name = name ? name : output.name;
        output.barcode = barcode ? barcode : output.barcode;
        output.inputPrice = inputPrice ? inputPrice : output.inputPrice;
        output.salePrice = salePrice ? salePrice : output.salePrice;
        output.weight = weight ? weight : output.weight;
        output.avatar = avatar ? avatar : output.avatar;
        output.detailAvatar = detailAvatar ? detailAvatar : output.detailAvatar;
        output.itemDescription = itemDescription ? itemDescription : output.itemDescription;
        output.stockAmount = stockAmount ? stockAmount : output.stockAmount;
        output.itemCategory = itemCategory ? itemCategory : output.itemCategory;

        // SAVE RESULTS
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