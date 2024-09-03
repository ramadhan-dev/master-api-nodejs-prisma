const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const AttendanceService = require('../services/AttendanceService');
const AttendanceController = require('../controllers/AttendanceController');
const AttendanceRules = require('../rules/AttendanceRules')
const validate = require(process.cwd() + '/src/utility/validation')
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');

const UserService = require('../../user/services/UserService')
const UserLocationService = require('../../location/services/UserLocationService')
const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const attendanceService = new AttendanceService(prismaDB2);
const userService = new UserService(prismaDB2);
const userLocationService = new UserLocationService(prismaDB2);
const attendanceController = new AttendanceController(attendanceService, userService, userLocationService, formatResponse);

router.get('/getAll', attendanceController.getAllAttendance.bind(attendanceController));
router.post('/create', validate(AttendanceRules.create), attendanceController.createAttendance.bind(attendanceController));
router.get('/getOne/:user_location_id', attendanceController.getAttendance.bind(attendanceController));
router.put('/update/:user_location_id', validate(AttendanceRules.create), attendanceController.updateAttendance.bind(attendanceController));
router.delete('/delete/:user_location_id', attendanceController.deleteAttendance.bind(attendanceController));

module.exports = router;

