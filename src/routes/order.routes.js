const express = require('express');
const router = express.Router();
const controller = require('../controllers/order.controller');
const middleware = require('../middlewares/getID');

///////////////////////////////////// CREATE ORDER
router.post('/', controller.orderCreate);

///////////////////////////////////// GET ALL ORDER
router.get('/', controller.orderGetall);

///////////////////////////////////// DELETE ORDER
router.delete('/:id', middleware.getOrder, controller.orderDelete);

///////////////////////////////////// EXPORT MODULE
module.exports = router;