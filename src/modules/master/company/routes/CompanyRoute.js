const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const CompanyService = require('../services/CompanyService');
const CompanyController = require('../controllers/CompanyController');
const companyRule = require('../rules/CompanyRules')
const validate = require(process.cwd() + '/src/utility/validation')

const TenantService = require('../../tenant/services/TenantService');


const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const tenantService = new TenantService(prismaDB2);
const companyService = new CompanyService(prismaDB2);
const companyController = new CompanyController(companyService, tenantService);

router.get('/getAll', companyController.getAllCompanies.bind(companyController));
router.post('/create', validate(companyRule.create), companyController.createCompany.bind(companyController));
router.get('/getOne/:company_code', companyController.getCompany.bind(companyController));
router.put('/update/:company_code', companyController.updateCompany.bind(companyController));
router.delete('/delete/:company_code', companyController.deleteCompany.bind(companyController));

module.exports = router;

