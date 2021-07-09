/* eslint-disable no-console */
/* eslint-disable eqeqeq */
const flashSale = require('../models/flashSale');
const Item = require('../models/item');
const _ = require('lodash');
const pageSortMiddleware = require('../middlewares/pageSort');
const User = require('../models/user');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');

///////////////////////////////////// GET ALL FLASH SALE
const fsaleGetall = async (name, pageNumber, pageSize) => {
    try {
        // GET ONE FSALE
        if (name) {
            const findOne = await flashSale.findOne({ 'name': { $eq: name } });
            if (findOne) return findOne;
        }
        // GET ALL FSALE
        const fsaleGet = await flashSale.find();
        // SORT DATABASE
        const sortedFsale = _.sortBy(fsaleGet, 'name');
        // SORT THE PAGE
        const sortedPage = pageSortMiddleware.pageSort(sortedFsale, pageNumber, pageSize);
        return sortedPage;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// CREATE FLASH SALE
const fsaleCreate = async (object) => {
    try {
        const itemGet = await Item.findOne({ '_id': { $eq: object.itemID } });
        // CREATE FLASH SALE
        const fsale = new flashSale({
            name: object.name,
            startDate: object.startDate,
            endDate: object.endDate,
            itemID: object.itemID,
            itemName: itemGet.name,
            percentDiscount: object.percentDiscount,
        });
        const newFsale = await fsale.save();
        return newFsale;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// NOTIFICATION EMAIL
const notificationEmail = async (object) => {
    try {
        // EMAIL SET UP
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // FIND USER
        const allUser = await User.find({ 'saleNotification': true });

        // CALCULATE TIME
        const notificationTime = object.startDate.setMinutes(object.startDate.getMinutes() - 15);

        for (let i = 0; i < allUser.length; i++) {
            // SET UP EMAIL INFORMATION
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: allUser[i].email,
                subject: 'Flash Sale Notification',
                text: `${object.name} ${object.percentDiscount}% will begin in 15 minutes`,
            };
            // SET UP SCHEDULE
            schedule.scheduleJob(notificationTime, () => {
                console.log('Email send');
                transporter.sendMail(mailOptions, function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            });
        }
    } catch (error) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// DELETE FLASH SALE
const fsaleDelete = async (output) => {
    try {
        const deletedFsale = await output.remove();
        return deletedFsale;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// UPDATE FLASH SALE
const fsaleUpdate = async (input, output) => {
    try {
        if (input.name != null) {
            output.name = input.name;
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
    fsaleGetall,
    fsaleCreate,
    notificationEmail,
    fsaleDelete,
    fsaleUpdate,
};
module.exports = services;