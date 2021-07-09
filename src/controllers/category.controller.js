/* eslint-disable eqeqeq */
const Category = require('../models/category');
const validation = require('../validation/create.validation');
const services = require('../services/category.services');
const { categoryMessenge } = require('../utils/systemMessenge');

///////////////////////////////////// GET ALL CATEGORIES
const categoryGetall = async (req, res) => {
    try {
        const sortedPage = await services.categoryGetall(req.body.name, req.body.pageNumber, req.body.pageSize);
        res.status(200).json(sortedPage);

    } catch (err) {
        res.status(500).json({ messenge: categoryMessenge.unexpectedErr });
    }
};

///////////////////////////////////// CREATE CATEGORY
const categoryCreate = async (req, res) => {
    try {
        // VALIDATE DATA
        const { error } = validation.categoryValidation(req.body);
        if (error) return res.status(400).json({ messenge: error.details[0].message });

        // CHECK IF CATEGORY EXIST IN DATABASE
        const categoryExist = await Category.findOne({ name: req.body.name });
        if (categoryExist) return res.status(400).json({ err: 'Category already exist' });

        // CREATE CATEGORY
        const newCategory = await services.categoryCreate(req.body);
        res.status(201).json({
            messenge: categoryMessenge.successCreate,
            newCategory,
        });
    } catch (err) {
        res.status(400).json({ messenge: categoryMessenge.unexpectedErr });
    }
};

///////////////////////////////////// DELETE CATEGORY
const categoryDelete = async (req, res) => {
    try {
        await services.categoryDelete(res.category);
        res.status(200).json({ messenge: categoryMessenge.successDeleted });
    } catch (err) {
        res.status(500).json({ messenge: categoryMessenge.unexpectedErr });
    }
};

///////////////////////////////////// UPDATE CATEGORY
const categoryUpdate = async (req, res) => {
    try {
        const updatedCategory = await services.categoryUpdate(req.body, res.category);
        res.status(200).json({
            messenge: categoryMessenge.successUpdated,
            updatedCategory,
        });
    } catch (err) {
        res.status(400).json({ messenge: categoryMessenge.unexpectedErr });
    }
};

///////////////////////////////////// EXPORT MODULES
const controller = {
    categoryGetall,
    categoryCreate,
    categoryUpdate,
    categoryDelete,
};
module.exports = controller;
