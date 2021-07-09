const Joi = require('@hapi/joi');

/////////////////////////////////////// REGISTER VALIDATION
const registerValidation = (data) => {
    const schema = {
        name: Joi.string().required().min(4),
        email: Joi.string().required().email().min(6),
        password: Joi.string().required().min(4),
        birthyear: Joi.number(),
        address: Joi.string().allow(null, ''),
        phoneNumber: Joi.string(),
        role: Joi.string().default('user'),
    };

    return Joi.validate(data, schema);
};

///////////////////////////////////// LOGIN VALIDATION
const loginValidation = (data) => {
    const schema = {
        email: Joi.string().required().email().min(6),
        password: Joi.string().required(),
    };

    return Joi.validate(data, schema);
};

///////////////////////////////////// EXPORT MODULES
const validation = {
    registerValidation,
    loginValidation,
};
module.exports = validation;
