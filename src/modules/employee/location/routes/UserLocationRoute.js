const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const UserLocationService = require('../services/UserLocationService');
const UserLocationController = require('../controllers/UserLocationController');
const UserLocationRules = require('../rules/UserLocationRules')
const validate = require(process.cwd() + '/src/utility/validation')

const UserService = require('./../../user/services/UserService')

const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const userLocationService = new UserLocationService(prismaDB2);
const userService = new UserService(prismaDB2);
const userLocationController = new UserLocationController(userLocationService, userService);

router.get('/getAll', userLocationController.getAllUserLocation.bind(userLocationController));
router.post('/create', validate(UserLocationRules.create), userLocationController.createUserLocation.bind(userLocationController));
router.get('/getOne/:user_location_id', userLocationController.getUserLocation.bind(userLocationController));
router.put('/update/:user_location_id', validate(UserLocationRules.create), userLocationController.updateUserLocation.bind(userLocationController));
router.delete('/delete/:user_location_id', userLocationController.deleteUserLocation.bind(userLocationController));

module.exports = router;

