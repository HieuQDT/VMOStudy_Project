const express = require('express');
const router = express.Router();
const controller = require('../controllers/item.controller');
const middleware = require('../middlewares/getID');
const tokenValidation = require('../validation/verifyToken');

///////////////////////////////////// GET ALL ITEMS
router.get('/', controller.itemGetall);

///////////////////////////////////// CREATE ITEM
router.post('/', tokenValidation.verifyToken, tokenValidation.verifyRoles, controller.itemCreate);

///////////////////////////////////// UPDATE ITEM
router.patch('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getItem, controller.itemUpdate);

///////////////////////////////////// DELETE ITEM
router.delete('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getItem, controller.itemDelete);

///////////////////////////////////// EXPORT MODULE
module.exports = router;