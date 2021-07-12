/* eslint-disable no-await-in-loop */
/* eslint-disable eqeqeq */
const Order = require('../models/order');
const Item = require('../models/item');
const User = require('../models/user');
const voucher = require('../models/voucher');
const fsale = require('../models/flashSale');
const { orderMessenge } = require('../utils/systemMessenge');
const pageSortMiddleware = require('../middlewares/pageSort');
const _ = require('lodash');

///////////////////////////////////// VOUCHER FUNCTION
const voucherConfig = async (itemID, voucherName, salePrice, reducedFsalePrice) => {
    const voucherGet = await voucher.findOne({
        $and: [
            { 'itemID': { $eq: itemID } },
            { 'voucherName': { $eq: voucherName } },
            { 'endDate': { $gte: new Date() } },
        ],
    });
    let reducedVoucherPrice = 0;
    if (voucherGet) {
        if (new Date(voucherGet.endDate) > new Date()) {
            reducedVoucherPrice = ((salePrice - reducedFsalePrice) / 100) * voucherGet.percentDiscount;
            return reducedVoucherPrice;
        }
    } else return reducedVoucherPrice;
};

///////////////////////////////////// FLASH SALE FUNCTION
const fsaleConfig = async (itemID, salePrice) => {
    const fsaleGet = await fsale.findOne({
        'itemID': { $eq: itemID },
        $and: [
            { 'startDate': { $lte: new Date() } },
            { 'endDate': { $gte: new Date() } },
        ],
    });
    let reducedFsalePrice = 0;
    if (fsaleGet) {
        if (fsaleGet.itemID === itemID) {
            reducedFsalePrice = (salePrice / 100) * fsaleGet.percentDiscount;
            return reducedFsalePrice;
        }
    } else return reducedFsalePrice;
};

///////////////////////////////////// CREATE ORDER
const orderCreate = async (req, res) => {
    try {
        // GETTING ITEM IN DATABASE WITH ID AND CALCULATE TOTAL PRICE
        let finalPrice = 0;
        for (let i = 0; i < req.body.orderContent.length; i++) {
            // CONFIG ITEM
            const itemGet = await Item.findOne({ '_id': { $eq: req.body.orderContent[i].id } });
            if (!itemGet) return res.status(400).json({ messenge: orderMessenge.findNoItem });
            // CHECK STOCK
            if (itemGet.stockAmount < req.body.orderContent[i].quantity) return res.status(400).json({ messenge: orderMessenge.outOfStock });
            // UPDATE ITEM STOCK AMOUNT
            if (itemGet) {
                req.body.orderContent[i].name = itemGet.name;
                req.body.orderContent[i].initialPrice = itemGet.salePrice;
                const stockLeft = itemGet.stockAmount - req.body.orderContent[i].quantity;
                await Item.updateOne({ _id: req.body.orderContent[i].id }, { $set: { stockAmount: stockLeft } });
            }

            // CONFIG FLASH SALE
            const reducedFsalePrice = await fsaleConfig(itemGet.id, itemGet.salePrice);
            if (reducedFsalePrice != 0) req.body.orderContent[i].fsaleReduce = reducedFsalePrice;

            // CONFIG VOUCHER
            let reducedVoucherPrice = 0;
            if (req.body.voucherName) {
                let itemID = req.body.orderContent[i].id;
                let voucherName = req.body.voucherName;
                reducedVoucherPrice = await voucherConfig(itemID, voucherName, itemGet.salePrice, reducedFsalePrice);
            }
            if (reducedVoucherPrice != 0) req.body.orderContent[i].voucherReduce = reducedVoucherPrice;

            // CALCULATE ITEM PRICE
            const itemPrice = (itemGet.salePrice - reducedFsalePrice - reducedVoucherPrice) * req.body.orderContent[i].quantity;
            req.body.orderContent[i].finalItemPrice = itemPrice;
            finalPrice += itemPrice;
        }
        // CONNECT WITH USER
        if (req.body.userID) {
            const userGet = await User.findOne({ '_id': { $eq: req.body.userID } });
            if (userGet) {
                req.body.orderContent.push({
                    User: userGet.name,
                    Email: userGet.email,
                    phoneNumber: userGet.phoneNumber,
                });
            }
        }
        // CREATE ORDER
        const order = new Order({
            orderContent: req.body.orderContent,
            totalPrice: finalPrice,
            // userID: req.body.userID,
        });
        const newOrder = await order.save();
        return newOrder;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// GET ORDER
const orderGetall = async (orderID, pageNumber, pageSize) => {
    try {
        // GET ONE ORDER
        if (orderID) {
            const findOne = await Order.findOne({ '_id': { $eq: orderID } });
            if (findOne) return findOne;
        }
        // GET ALL ORDER
        const orderGet = await Order.find();
        // SORT ORDER DATABASE
        const sortedOrder = _.sortBy(orderGet, 'date');
        // SORT THE PAGE
        const sortedPage = pageSortMiddleware.pageSort(sortedOrder, pageNumber, pageSize);
        return sortedPage;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// DELETE ITEM
const orderDelete = async (output) => {
    try {
        const deletedOrder = await output.remove();
        return deletedOrder;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// EXPORT MODULE
const services = {
    orderCreate,
    orderGetall,
    orderDelete,
};
module.exports = services;