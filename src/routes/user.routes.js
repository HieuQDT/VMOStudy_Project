const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const middleware = require('../middlewares/getID');
const tokenValidation = require('../validation/verifyToken');

///////////////////////////////////// CREATE USER
router.post('/register', controller.userCreate);

///////////////////////////////////// CREATE ADMIN
router.post('/register/admin', tokenValidation.verifyToken, tokenValidation.verifyRoles, controller.adminCreate);

///////////////////////////////////// VERIFY USER
router.get('/verify/:id', controller.userVerify);

///////////////////////////////////// USER LOGIN
router.post('/login', controller.userLogin);

///////////////////////////////////// GET LIST USER
router.get('/', controller.userGetall);

///////////////////////////////////// UPDATE USER
router.patch('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getUser, controller.userUpdate);

///////////////////////////////////// DELETE USER
router.delete('/:id', tokenValidation.verifyToken, tokenValidation.verifyRoles, middleware.getUser, controller.userDelete);

///////////////////////////////////// EXPORT MODULE
module.exports = router;