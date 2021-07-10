/* eslint-disable eqeqeq */
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { userMessenge } = require('../utils/systemMessenge');
const _ = require('lodash');
const pageSortMiddleware = require('../middlewares/pageSort');
const Order = require('../models/order');

///////////////////////////////////// CREATE USER
const userCreate = async (object) => {
    try {
        // USER CREATE
        const user = new User({
            name: object.name,
            email: object.email,
            password: object.password,
            paymentId: object.paymentId,
            birthyear: object.birthyear,
            address: object.address,
            phoneNumber: object.phoneNumber,
        });
        const newUser = await user.save();
        return newUser;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// CREATE ADMIN
const adminCreate = async (object) => {
    try {
        // ADMIN CREATE
        const admin = new User({
            name: object.name,
            email: object.email,
            password: object.password,
            paymentId: object.paymentId,
            birthyear: object.birthyear,
            address: object.address,
            phoneNumber: object.phoneNumber,
            role: object.role,
        });
        const newAdmin = await admin.save();
        return newAdmin;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// EMAIL NOTIFICATION
const notificationEmail = async (object, newUser) => {
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

        // SENDING VERIFY EMAIL
        const verificationToken = newUser.generateVerificationToken();
        const url = `http://localhost:1234/user/verify/${verificationToken}`;
        transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: object.email,
            subject: 'Verify Account',
            html: `Click <a href = '${url}'>here</a> to confirm your email.`,
        });

    } catch (error) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// VERIFY USER
const userVerify = async (req, res) => {
    const token = req.params;
    // CHECK ID
    if (!token) return res.status(404).json({ messenge: userMessenge.userVerifyNoToken });
    // VERIFY URL TOKEN
    let payload = null;
    try {
        payload = jwt.verify(token.id, process.env.TOKEN_SECRET, { expiresIn: '24h' });
    } catch (err) {
        return res.status(500).send(err);
    }

    // CONFIG
    try {
        // FIND USER
        const user = await User.findOne({ _id: payload.ID }).exec();
        if (!user) return res.status(404).json({ messenge: userMessenge.userVerifyNoUser });
        // UPDATE USER STATUS
        user.verified = true;
        await user.save();
        res.status(200).json({ message: userMessenge.userVerifySuccess });
    } catch (err) {
        return res.status(500).send(err);
    }
};

///////////////////////////////////// USER LOGIN
const userLogin = async (req, res) => {
    // CHECK IF EMAIL EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: userMessenge.userLoginFail });
    // CHECK IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: userMessenge.userLoginFail });
    // CHECK IF USER HAS BEEN VERIFIED
    if (!user.verified) return res.status(403).json({ message: userMessenge.userLoginNoVerify });

    // CREATE AND ASSIGN TOKEN 
    // eslint-disable-next-line object-property-newline
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({
        messenge: userMessenge.userLoginSuccess,
        usertoken: token,
    });
};

///////////////////////////////////// GET ALL USER
const userGetall = async (email, name, pageNumber, pageSize) => {
    try {
        // GET ONE USER
        if (email) {
            const findOne = await User.findOne({ 'email': { $eq: email } });
            if (findOne) {
                const findOrder = await Order.find({ 'userID': { $eq: findOne.id } });
                const result = {
                    userInfo: findOne,
                    orderList: findOrder,
                };
                return result;
            }
        }
        if (name) {
            const findOne = await User.findOne({ 'name': { $eq: name } });
            if (findOne) {
                const findOrder = await Order.find({ 'userID': { $eq: findOne.id } });
                const result = {
                    userInfo: findOne,
                    orderList: findOrder,
                };
                return result;
            }
        }
        // GET ALL USER
        const userGet = await User.find();
        // SORT DATABASE
        const sortedUser = _.sortBy(userGet, 'name');
        // SORT THE PAGE
        const sortedPage = pageSortMiddleware.pageSort(sortedUser, pageNumber, pageSize);
        return sortedPage;

    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// DELETE USER
const userDelete = async (output) => {
    try {
        const deletedUser = await output.remove();
        return deletedUser;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// UPDATE USER
const userUpdate = async (input, output) => {
    try {
        if (input.name != null) {
            output.name = input.name;
        }
        if (input.password != null) {
            output.password = input.password;
        }
        if (input.address != null) {
            output.address = input.address;
        }
        if (input.birthyear != null) {
            output.birthyear = input.birthyear;
        }
        if (input.phoneNumber != null) {
            output.phoneNumber = input.phoneNumber;
        }
        const {name, password, address, birthyear, phoneNumber } = input;
        // SET RESULTS TO OUTPUT
        output.name = name ? name : output.name;
        output.password = password ? password : output.password;
        output.address = address ? address : output.address;
        output.birthyear = birthyear ? birthyear : output.birthyear;
        output.phoneNumber = phoneNumber ? phoneNumber : output.phoneNumber;

        // SAVE RESULTS
        const updatedUser = await output.save();
        return updatedUser;
    } catch (err) {
        throw Error('Unexpected error');
    }
};

///////////////////////////////////// EXPORT MODULES
const services = {
    userCreate,
    adminCreate,
    notificationEmail,
    userVerify,
    userLogin,
    userGetall,
    userDelete,
    userUpdate,
};
module.exports = services;