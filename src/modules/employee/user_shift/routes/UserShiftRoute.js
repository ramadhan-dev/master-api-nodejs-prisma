const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const UserShiftService = require('../services/UserShiftService');
const UserShiftController = require('../controllers/UserShiftController');
const UserShiftRules = require('../rules/UserShiftRules')
const validate = require(process.cwd() + '/src/utility/validation')
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');

const UserService = require('../../user/services/UserService')
const ShiftTypeService = require('../../shift_type/services/ShiftTypeService')

const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const userShiftService = new UserShiftService(prismaDB2);
const userService = new UserService(prismaDB2);
const shiftTypeService = new ShiftTypeService(prismaDB2);
const userShiftController = new UserShiftController(userShiftService, userService, shiftTypeService, formatResponse);

router.get('/getAll', userShiftController.getAllUserShift.bind(userShiftController));
router.get('/getAllByUser/:user_id', userShiftController.getAllByUSer.bind(userShiftController));
router.post('/create', validate(UserShiftRules.create), userShiftController.createUserShift.bind(userShiftController));
router.get('/getOne/:user_shift_id', userShiftController.getUserShift.bind(userShiftController));
router.put('/update/:user_shift_id', validate(UserShiftRules.create), userShiftController.updateUserShift.bind(userShiftController));
router.delete('/delete/:user_shift_id', userShiftController.deleteUserShift.bind(userShiftController));

module.exports = router;

