const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const ShiftTypeService = require('../services/ShiftTypeService');
const ShiftTypeController = require('../controllers/ShiftTypeController');
const ShiftTypeRules = require('../rules/ShiftTypeRules')
const validate = require(process.cwd() + '/src/utility/validation')
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');

const router = express.Router();
const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const shiftTypeService = new ShiftTypeService(prismaDB2);
const shiftTypeController = new ShiftTypeController(shiftTypeService, formatResponse);

router.get('/getAll', shiftTypeController.getAllShiftType.bind(shiftTypeController));
router.post('/create', validate(ShiftTypeRules.create), shiftTypeController.createShiftType.bind(shiftTypeController));
router.get('/getOne/:shift_type_id', shiftTypeController.getShiftType.bind(shiftTypeController));
router.put('/update/:shift_type_id', validate(ShiftTypeRules.create), shiftTypeController.updateShiftType.bind(shiftTypeController));
router.delete('/delete/:shift_type_id', shiftTypeController.deleteShiftType.bind(shiftTypeController));

module.exports = router;

