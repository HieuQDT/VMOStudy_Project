/* eslint-disable eqeqeq */
const Category = require('../models/category');
const Item = require('../models/item');
const _ = require('lodash');
const pageSortMiddleware = require('../middlewares/pageSort');
const logger = require('../config/logger');

///////////////////////////////////// GET CATEGORY
const categoryGetall = async (name, pageNumber, pageSize) => {
    try {
        // GET ONE CATEGORY
        if (name) {
            const findOne = await Category.findOne({ 'name': { $eq: name } });
            if (findOne) {
                const findItem = await Item.find({ 'itemCategory': { $eq: name } });
                const result = {
                    categoryInfo: findOne,
                    itemList: findItem,
                };
                return result;
            }
        }

        // GET ALL CATEGORY
        const categoryGet = await Category.find();
        // SORT THE CATEGORY
        const sortedCategory = _.sortBy(categoryGet, 'index');
        // SORT THE PAGE
        const sortedPage = pageSortMiddleware.pageSort(sortedCategory, pageNumber, pageSize);
        return sortedPage;

    } catch (err) {
        logger.error(err);
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// CREATE CATEGORY
const categoryCreate = async (object) => {
    try {
        // CREATE CATEGORY
        const category = new Category({
            name: object.name,
            active: object.active,
            bannerImage: object.bannerImage,
            index: object.index,
        });
        const newCategory = await category.save();
        return newCategory;
    } catch (err) {
        logger.error(err);
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// DELETE CATEGORY
const categoryDelete = async (output) => {
    try {
        const deletedCategory = await output.remove();
        return deletedCategory;
    } catch (err) {
        logger.error(err);
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// UPDATE CATEGORY
const categoryUpdate = async (input, output) => {
    try {
        const { name, active, bannerImage, index } = input;
        // SET RESULTS TO OUTPUT
        output.name = name ? name : output.name;
        output.active = active ? active : output.active;
        output.bannerImage = bannerImage ? bannerImage : output.bannerImage;
        output.index = index ? index : output.index;

        // SAVE RESULTS
        const updatedCategory = await output.save();
        return updatedCategory;
    } catch (err) {
        logger.error(err);
        throw Error('Unexpected error');
    }
};
///////////////////////////////////// EXPORT MODULES
const services = {
    categoryGetall,
    categoryCreate,
    categoryDelete,
    categoryUpdate,
};
module.exports = services;