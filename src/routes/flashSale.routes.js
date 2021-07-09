const express = require('express');
const router = express.Router();
const controller = require('../controllers/flashSale.controller');
const middleware = require('../middlewares/getID');
const tokenValidation = require('../validation/verifyToken');

///////////////////////////////////// GET FLASH SALE
router.get('/', controller.fsaleGetall);

///////////////////////////////////// CREATE FLASH SALE
router.post('/', tokenValidation.verifyToken, tokenValidation.verifyRoles, controller.fsaleCreate);

///////////////////////////////////// UPDATE FLASH SALE
router.patch('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getFsale, controller.fsaleUpdate);

///////////////////////////////////// DELETE FLASH SALE
router.delete('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getFsale, controller.fsaleDelete);

///////////////////////////////////// EXPORT MODULE
module.exports = router;