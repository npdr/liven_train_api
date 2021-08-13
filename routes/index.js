const express = require('express');
const UserController = require('../controllers/user');
const AddressController = require('../controllers/address');

const router = express.Router();
const userController = new UserController();

router.get('/user/:id', userController.getUserById);
router.get('/user', userController.getUserByName);

router.post('/user', userController.createUser);

router.put('/user/:id', userController.updateUser);

router.delete('/user/:id', userController.deleteUser);

module.exports = router;