const Category = require('../models/category');
const Item = require('../models/item');
const User = require('../models/user');
const flashSale = require('../models/flashSale');
const Voucher = require('../models/voucher');
const Order = require('../models/order');
const { getID } = require('../utils/systemMessenge');

///////////////////////////////////// GET CATEGORY ID
const getCategory = async (req, res, next) => {
    let validate;
    try {
        validate = await Category.findById(req.params.id);
        if (validate === null) {
            return res.status(404).json({ messenge: getID.invalidID });
        }
    } catch (err) {
        return res.status(500).json({ messenge: getID.unexpectedErr });
    }
    res.category = validate;
    next();
};

///////////////////////////////////// GET ITEM ID
const getItem = async (req, res, next) => {
    let validate;
    try {
        validate = await Item.findById(req.params.id);
        if (validate === null) {
            return res.status(404).json({ messenge: getID.invalidID });
        }
    } catch (err) {
        return res.status(500).json({ messenge: getID.unexpectedErr });
    }
    res.item = validate;
    next();
};

///////////////////////////////////// GET USER ID
const getUser = async (req, res, next) => {
    let validate;
    try {
        validate = await User.findById(req.params.id);
        if (validate === null) {
            return res.status(404).json({ messenge: getID.invalidID });
        }
    } catch (err) {
        return res.status(500).json({ messenge: getID.unexpectedErr });
    }
    res.user = validate;
    next();
};

///////////////////////////////////// GET FLASH SALE ID
const getFsale = async (req, res, next) => {
    let validate;
    try {
        validate = await flashSale.findById(req.params.id);
        if (validate === null) {
            return res.status(404).json({ messenge: getID.invalidID });
        }
    } catch (err) {
        return res.status(500).json({ messenge: getID.unexpectedErr });
    }
    res.fsale = validate;
    next();
};

///////////////////////////////////// GET VOUCHER ID
const getVoucher = async (req, res, next) => {
    let validate;
    try {
        validate = await Voucher.findById(req.params.id);
        if (validate === null) {
            return res.status(404).json({ messenge: getID.invalidID });
        }
    } catch (err) {
        return res.status(500).json({ messenge: getID.unexpectedErr });
    }
    res.voucher = validate;
    next();
};

///////////////////////////////////// GET ORDER ID
const getOrder = async (req, res, next) => {
    let validate;
    try {
        validate = await Order.findById(req.params.id);
        if (validate === null) {
            return res.status(404).json({ messenge: getID.invalidID });
        }
    } catch (err) {
        return res.status(500).json({ messenge: getID.unexpectedErr });
    }
    res.order = validate;
    next();
};

///////////////////////////////////// EXPORT MODULES
const middleware = {
    getCategory,
    getItem,
    getUser,
    getFsale,
    getVoucher,
    getOrder,
};
module.exports = middleware;