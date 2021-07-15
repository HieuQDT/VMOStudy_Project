/* eslint-disable eqeqeq */
const User = require('../models/user');
const validation = require('../validation/user.validation');
const services = require('../services/user.services');
const { userMessenge } = require('../utils/systemMessenge');

///////////////////////////////////// USER CREATE
const userCreate = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.registerValidation(req.body);
        if (error) return res.status(400).json({ messenge: error.details[0].message });

        // CHECK IF USER EXIST IN DATABASE
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).json({ messenge: userMessenge.emailExist });

        // CREATE USER
        const newUser = await services.userCreate(req.body);
        // SEND EMAIL NOTIFICATION
        await services.notificationEmail(req.body, newUser);

        res.status(201).json({
            messenge: userMessenge.successCreate,
            newUser,
        });

    } catch (err) {
        res.status(500).json({ messenge: userMessenge.unexpectedErr });
    }
};

///////////////////////////////////// ADMIN CREATE
const adminCreate = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.registerValidation(req.body);
        if (error) return res.status(400).json({ err: error.details[0].message });

        // CHECK IF USER EXIST IN DATABASE
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).json({ messenge: userMessenge.emailExist });

        // CREATE USER
        const newAdmin = await services.adminCreate(req.body);
        // SEND EMAIL NOTIFICATION
        await services.notificationEmail(req.body, newAdmin);

        res.status(201).json({
            messenge: userMessenge.successCreate,
            newAdmin,
        });

    } catch (err) {
        res.status(500).json({ messenge: userMessenge.unexpectedErr });
    }
};

///////////////////////////////////// VERIFY USER
const userVerify = async (req, res) => {
    try {
        await services.userVerify(req, res);
    } catch (err) {
        return res.status(500).send(err);
    }
};

///////////////////////////////////// USER LOGIN
const userLogin = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.loginValidation(req.body);
        if (error) return res.status(400).json({ err: error.details[0].message });
        await services.userLogin(req, res);
    } catch (err) {
        return res.status(500).send(err);
    }
};

///////////////////////////////////// GET ALL USER
const userGetall = async (req, res) => {
    try {
        // CONVERT QUERY TO NUMBER
        const pageNumberInput = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1;
        const pageSizeInput = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
        // SORTED PAGE
        const sortedPage = await services.userGetall(req.query.email, req.query.name, pageNumberInput, pageSizeInput);
        res.status(200).json(sortedPage);

    } catch (err) {
        res.status(500).json({ messenge: userMessenge.unexpectedErr });
    }
};

///////////////////////////////////// DELETE USER
const userDelete = async (req, res) => {
    try {
        await services.userDelete(res.user);
        res.status(200).json({ messenge: userMessenge.successDeleted });
    } catch (err) {
        res.status(500).json({ messenge: userMessenge.unexpectedErr });
    }
};

///////////////////////////////////// UPDATE USER
const userUpdate = async (req, res) => {
    try {
        const updatedUser = await services.userUpdate(req.body, res.user);
        res.status(200).json({
            messenge: userMessenge.successUpdated,
            updatedUser,
        });
    } catch (err) {
        res.status(500).json({ messenge: userMessenge.unexpectedErr });
    }
};

///////////////////////////////////// EXPORT MODULES
const user = {
    userCreate,
    userLogin,
    userGetall,
    userDelete,
    userUpdate,
    adminCreate,
    userVerify,
};
module.exports = user;