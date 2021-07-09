/* eslint-disable no-await-in-loop */
/* eslint-disable eqeqeq */
// const Order = require('../models/order');
// const Item = require('../models/item');
// const voucher = require('../models/voucher');
// const fsale = require('../models/flashSale');
const validation = require('../validation/create.validation');
const services = require('../services/order.services');
const { orderMessenge } = require('../utils/systemMessenge');

///////////////////////////////////// CREATE ORDER
const orderCreate = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.orderValidation(req.body);
        if (error) return res.status(400).json({ err: error.details[0].message });
        // CREATE ORDER
        const newOrder = await services.orderCreate(req, res);
        res.status(201).json({
            messenge: orderMessenge.successCreate,
            newOrder,
        });
    } catch (err) {
        res.status(400).json({ messenge: orderMessenge.unexpectedErr });
    }
};

///////////////////////////////////// GET ALL ORDER
const orderGetall = async (req, res) => {
    try {
        const sortedPage = await services.orderGetall(req.body.orderID, req.body.pageNumber, req.body.pageSize);
        res.status(200).json(sortedPage);
    } catch (err) {
        res.status(500).json({ messenge: orderMessenge.unexpectedErr });
    }
};

///////////////////////////////////// DELETE ORDER
const orderDelete = async (req, res) => {
    try {
        await services.orderDelete(res.order);
        res.status(200).json({ messenge: orderMessenge.successDeleted });
    } catch (err) {
        res.status(500).json({ messenge: orderMessenge.unexpectedErr });
    }
};

///////////////////////////////////// EXPORT MODULE
const order = {
    orderCreate,
    orderGetall,
    orderDelete,
};
module.exports = order;