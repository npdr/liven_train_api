const express = require('express');
const UserController = require('../controllers/user');
const AddressController = require('../controllers/address');

const router = express.Router();
const userController = new UserController();
const addressController = new AddressController();

router.post('/user', userController.createUser);
router.post('/user/address', addressController.createAddress);

router.get('/user/address', addressController.getAddressByField);
router.get('/user/:id', userController.getUserById);
router.get('/user', userController.getUserByField);
router.get('/user/address/:id', addressController.getAddressById);

router.put('/user/:id', userController.updateUser);
router.put('/user/address/:id', addressController.updateAddress);

router.delete('/user/:id', userController.deleteUser);
router.delete('/user/address/:id', addressController.deleteAddress);

module.exports = router;