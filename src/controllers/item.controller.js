/* eslint-disable eqeqeq */
const Item = require('../models/item');
const Category = require('../models/category');
const Order = require('../models/order');
const services = require('../services/item.services');
const validation = require('../validation/create.validation');
const { itemMessenge } = require('../utils/systemMessenge');

///////////////////////////////////// GET ALL ITEMS
const itemGetall = async (req, res) => {
    try {
        const sortedPage = await services.itemGetall(req.body.name, req.body.pageNumber, req.body.pageSize);
        res.status(200).json(sortedPage);
    } catch (err) {
        res.status(500).json({ messenge: itemMessenge.unexpectedErr });
    }
};

///////////////////////////////////// CREATE ITEM
const itemCreate = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.itemValidation(req.body);
        if (error) return res.status(400).json({ messenge: error.details[0].message });

        // CHECK IF ITEM EXIST IN DATABASE
        const itemExist = await Item.findOne({ name: req.body.name });
        if (itemExist) return res.status(400).json({ messenge: itemMessenge.alreadyExist });

        // CHECK CATEGORY
        if (req.body.itemCategory) {
            const categoryExist = await Category.findOne({ name: req.body.itemCategory });
            if (!categoryExist) return res.status(400).json({ messenge: itemMessenge.invalidCategory });
        }

        // CREATE ITEM
        const newItem = await services.itemCreate(req.body);
        res.status(201).json({
            messenge: itemMessenge.successCreate,
            newItem,
        });

    } catch (err) {
        res.status(400).json({ messenge: itemMessenge.unexpectedErr });
    }
};

///////////////////////////////////// DELETE ITEM
const itemDelete = async (req, res) => {
    try {
        // CHECK IF ORDER CONTAIN ITEM
        const findOrder = await Order.find({ orderContent: { $elemMatch: { id: res.item.id } } });
        if (findOrder.length > 0) return res.status(400).json({ messenge: itemMessenge.orderExistNoDelete });

        // DELETE ITEM
        await services.itemDelete(res.item);
        res.status(200).json({ messenge: itemMessenge.successDeleted });
    } catch (err) {
        res.status(500).json({ messenge: itemMessenge.unexpectedErr });
    }
};

///////////////////////////////////// UPDATE ITEM
const itemUpdate = async (req, res) => {
    try {
        const updatedItem = await services.itemUpdate(req.body, res.item);
        res.status(200).json({
            messenge: itemMessenge.successUpdated,
            updatedItem,
        });
    } catch (err) {
        res.status(400).json({ messenge: itemMessenge.unexpectedErr });
    }
};

///////////////////////////////////// EXPORT MODULES
const controller = {
    itemGetall,
    itemCreate,
    itemUpdate,
    itemDelete,
};
module.exports = controller;
