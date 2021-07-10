/* eslint-disable no-console */
/* eslint-disable eqeqeq */
const flashSale = require('../models/flashSale');
const validation = require('../validation/create.validation');
const services = require('../services/fsale.services');
const { fsaleMessenge } = require('../utils/systemMessenge');

///////////////////////////////////// GET ALL FLASH SALE
const fsaleGetall = async (req, res) => {
    try {
        // CONVERT QUERY TO NUMBER
        const pageNumberInput = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
        const pageSizeInput = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
        // SORTED PAGE
        const sortedPage = await services.fsaleGetall(req.query.name, pageNumberInput, pageSizeInput);
        res.status(200).json(sortedPage);

    } catch (err) {
        res.status(500).json({ messenge: fsaleMessenge.unexpectedErr });
    }
};

///////////////////////////////////// CREATE FLASH SALE
const fsaleCreate = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.fsaleValidation(req.body);
        if (error) return res.status(400).json({ messenge: error.details[0].message });

        // CHECK START DATE CONDITIONS
        if (req.body.startDate > req.body.endDate) return res.status(400).json({ messenge: fsaleMessenge.largeStartDate });
        if (new Date() > new Date(req.body.startDate)) return res.status(400).json({ messenge: fsaleMessenge.pastStartDate });

        // CHECK FLASH SALE DATE CONDITIONS
        const fsaleExist = await flashSale.findOne({
            itemID: req.body.itemID,
            $or: [
                {
                    $and: [
                        { 'startDate': { $lte: req.body.startDate } },
                        { 'endDate': { $gte: req.body.startDate } },
                    ],
                },
                {
                    $and: [
                        { 'startDate': { $lte: req.body.endDate } },
                        { 'endDate': { $gte: req.body.endDate } },
                    ],
                },
            ],
        });
        if (fsaleExist) return res.status(400).json({ messenge: fsaleMessenge.alreadyExist });

        // CREATE ITEM
        const newFsale = await services.fsaleCreate(req.body);
        // SEND EMAIL NOTIFICATION
        await services.notificationEmail(newFsale);

        res.status(201).json({
            messenge: fsaleMessenge.successCreate,
            newFsale,
        });

    } catch (err) {
        res.status(400).json({ messenge: fsaleMessenge.unexpectedErr });
    }
};

///////////////////////////////////// DELETE FLASH SALE
const fsaleDelete = async (req, res) => {
    try {
        await services.fsaleDelete(res.fsale);
        res.status(200).json({ messenge: fsaleMessenge.successDeleted });
    } catch (err) {
        res.status(500).json({ messenge: fsaleMessenge.unexpectedErr });
    }
};

///////////////////////////////////// UPDATE FLASH SALE
const fsaleUpdate = async (req, res) => {
    try {
        const updatedFsale = await services.fsaleUpdate(req.body, res.fsale);
        res.status(200).json({
            messenge: fsaleMessenge.successUpdated,
            updatedFsale,
        });
    } catch (err) {
        res.status(400).json({ messenge: fsaleMessenge.unexpectedErr });
    }
};

///////////////////////////////////// EXPORT MODULES
const controller = {
    fsaleGetall,
    fsaleCreate,
    fsaleUpdate,
    fsaleDelete,
};
module.exports = controller;
