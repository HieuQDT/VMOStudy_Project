const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const middleware = require('../middlewares/getID');
const tokenValidation = require('../validation/verifyToken');

///////////////////////////////////// GET ALL CATEGORIES
router.get('/', controller.categoryGetall);

///////////////////////////////////// CREATE CATEGORY
router.post('/', tokenValidation.verifyToken, tokenValidation.verifyRoles, controller.categoryCreate);

///////////////////////////////////// UPDATE CATEGORY
router.patch('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getCategory, controller.categoryUpdate);

///////////////////////////////////// DELETE CATEGORY
router.delete('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getCategory, controller.categoryDelete);

///////////////////////////////////// EXPORT MODULE
module.exports = router;