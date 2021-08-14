const express = require('express');
const UserController = require('../controllers/user');
const AddressController = require('../controllers/address');

const router = express.Router();
const userController = new UserController();
const addressController = new AddressController();

router.post('/user', userController.createUser);
router.post('/user/address', addressController.createAddress);

router.get('/user/address', addressController.getAddressByState);
router.get('/user/:id', userController.getUserById);
router.get('/user', userController.getUserByName);
router.get('/user/address/:id', addressController.getAddressById);
router.get('/address/:id', addressController.getAddressByUserId);
router.get('/address', addressController.getAddressInRange);

router.put('/user/:id', userController.updateUser);
router.put('/user/address/:id', addressController.updateAddress);

router.delete('/user/:id', userController.deleteUser);
router.delete('/user/address/:id', addressController.deleteAddress);

module.exports = router;