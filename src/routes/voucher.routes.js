const express = require('express');
const router = express.Router();
const controller = require('../controllers/voucher.controller');
const middleware = require('../middlewares/getID');
const tokenValidation = require('../validation/verifyToken');

///////////////////////////////////// GET ALL VOUCHER
router.get('/', controller.voucherGetall);

///////////////////////////////////// CREATE VOUCHER
router.post('/', tokenValidation.verifyToken, tokenValidation.verifyRoles, controller.voucherCreate);

///////////////////////////////////// UPDATE VOUCHER
router.patch('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getVoucher, controller.voucherUpdate);

///////////////////////////////////// DELETE VOUCHER
router.delete('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getVoucher, controller.voucherDelete);

///////////////////////////////////// EXPORT MODULE
module.exports = router;