const Joi = require('@hapi/joi');

/////////////////////////////////////// CATEGORY CREATE VALIDATION
const categoryValidation = (data) => {
    const schema = {
        name: Joi.string().required(),
        active: Joi.boolean().required(),
        bannerImage: Joi.string().allow(null, ''),
        index: Joi.number().required(),
    };

    return Joi.validate(data, schema);
};

/////////////////////////////////////// ITEM CREATE VALIDATION
const itemValidation = (data) => {
    const schema = {
        name: Joi.string().required().min(4),
        barcode: Joi.string().required().max(10).min(6),
        inputPrice: Joi.number().required(),
        salePrice: Joi.number().required(),
        weight: Joi.number().allow(null),
        avatar: Joi.string().required(),
        detailAvatar: Joi.string().required(),
        itemDescription: Joi.string().allow(null, ''),
        stockAmount: Joi.number().required(),
        itemCategory: Joi.string(),
    };

    return Joi.validate(data, schema);
};

/////////////////////////////////////// FLASH SALE CREATE VALIDATION
const fsaleValidation = (data) => {
    const schema = {
        name: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        itemID: Joi.string().required(),
        percentDiscount: Joi.number().required().max(99).min(1),
    };

    return Joi.validate(data, schema);
};

/////////////////////////////////////// VOUCHER CREATE VALIDATION
const voucherValidation = (data) => {
    const schema = {
        voucherName: Joi.string().required(),
        endDate: Joi.date().required(),
        percentDiscount: Joi.number().required().max(99).min(1),
        itemID: Joi.string().required(),
    };

    return Joi.validate(data, schema);
};

/////////////////////////////////////// ORDER CREATE VALIDATION
const orderValidation = (data) => {
    const schema = {
        userID: Joi.string(),
        orderContent: Joi.array().required(),
        voucherName: Joi.string().allow(null, ''),
        date: Joi.date(),
    };

    return Joi.validate(data, schema);
};

///////////////////////////////////// EXPORT MODULES
const validation = {
    categoryValidation,
    itemValidation,
    fsaleValidation,
    voucherValidation,
    orderValidation,
};
module.exports = validation;
