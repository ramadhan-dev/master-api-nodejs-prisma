const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const DivisionService = require('../services/DivisionService');
const DivisionController = require('../controllers/DivisionController');
const DivisionRules = require('../rules/DivisionRules')
const validate = require(process.cwd() + '/src/utility/validation')
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');

const CompanyService = require('../../company/services/CompanyService');


const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const divisionService = new DivisionService(prismaDB2);
const companyService = new CompanyService(prismaDB2);
const divisionController = new DivisionController(divisionService, companyService, formatResponse);

router.get('/getAll', divisionController.getAllDivisions.bind(divisionController));
router.post('/create', validate(DivisionRules.create), divisionController.createDivision.bind(divisionController));
router.get('/getOne/:division_code', divisionController.getDivision.bind(divisionController));
router.put('/update/:division_code', divisionController.updateDivision.bind(divisionController));
router.delete('/delete/:division_code', divisionController.deleteDivision.bind(divisionController));

module.exports = router;

