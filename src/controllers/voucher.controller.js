/* eslint-disable eqeqeq */
// const Voucher = require('../models/voucher');
const Item = require('../models/item');
const validation = require('../validation/create.validation');
const services = require('../services/voucher.services');
const { voucherMessenge } = require('../utils/systemMessenge');

///////////////////////////////////// GET ALL VOUCHERS
const voucherGetall = async (req, res) => {
    try {
        // CONVERT QUERY TO NUMBER
        const pageNumberInput = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
        const pageSizeInput = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
        // SORTED PAGE
        const sortedPage = await services.voucherGetall(req.query.voucherName, pageNumberInput, pageSizeInput);
        res.status(200).json(sortedPage);

    } catch (err) {
        res.status(500).json({ messenge: voucherMessenge.unexpectedErr });
    }
};

///////////////////////////////////// CREATE VOUCHER
const voucherCreate = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.voucherValidation(req.body);
        if (error) return res.status(400).json({ messenge: error.details[0].message });

        // CHECK END DATE CONDITIONS
        if (new Date(req.body.endDate) < new Date()) return res.status(400).json({ messenge: voucherMessenge.pastEndDate });

        // VALIDATE ITEM ID
        const findItem = await Item.findOne({ '_id': req.body.itemID });
        if (!(findItem)) return res.status(400).json({ messenge: voucherMessenge.findNoItem });

        // CREATE VOUCHER
        const newVoucher = await services.voucherCreate(req.body);
        res.status(201).json({
            messenge: voucherMessenge.successCreate,
            newVoucher,
        });
    } catch (err) {
        res.status(400).json({ messenge: voucherMessenge.unexpectedErr });
    }
};

///////////////////////////////////// DELETE VOUCHER
const voucherDelete = async (req, res) => {
    try {
        await res.voucher.remove();
        res.status(200).json({ messenge: voucherMessenge.successDeleted });
    } catch (err) {
        res.status(500).json({ messenge: voucherMessenge.unexpectedErr });
    }
};

///////////////////////////////////// UPDATE VOUCHER
const voucherUpdate = async (req, res) => {
    try {
        const updatedVoucher = await services.voucherUpdate(req.body, res.voucher);
        res.status(200).json({
            messenge: voucherMessenge.successUpdated,
            updatedVoucher,
        });
    } catch (err) {
        res.status(400).json({ messenge: voucherMessenge.unexpectedErr });
    }
};

///////////////////////////////////// EXPORT MODULES
const controller = {
    voucherGetall,
    voucherCreate,
    voucherUpdate,
    voucherDelete,
};
module.exports = controller;
