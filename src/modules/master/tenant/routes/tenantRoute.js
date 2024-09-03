const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const TenantService = require('../services/TenantService');
const TenantController = require('../controllers/TenantController');
const tenantRule = require('../rules/TenantRules')
const validate = require(process.cwd() + '/src/utility/validation')
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');

const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const tenantService = new TenantService(prismaDB2);
const tenantController = new TenantController(tenantService, formatResponse);

router.get('/getAll', tenantController.getAllTenants.bind(tenantController));
router.post('/create', validate(tenantRule.create), tenantController.createTenant.bind(tenantController));
router.get('/getOne/:tenant_code', tenantController.getTenant.bind(tenantController));
router.put('/update/:tenant_code', tenantController.updateTenant.bind(tenantController));
router.delete('/delete/:tenant_code', tenantController.deleteTenant.bind(tenantController));

module.exports = router;

