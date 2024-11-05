const express =require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const UserService = require('../services/UserService');
const UserController = require('../controllers/UserController');
const userRule = require('../rules/UserRules')
const validate = require(process.cwd() + '/src/utility/validation')

const TenantService = require('../../../master/tenant/services/TenantService');
const CompanyService = require('../../../master/company/services/CompanyService');
const DivisionService = require('../../../master/division/services/DivisionService');
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');


const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const userService = new UserService(prismaDB2);
const tenantService = new TenantService(prismaDB2);
const companyService = new CompanyService(prismaDB2);
const divisionService = new DivisionService(prismaDB2);

const userController = new UserController(userService, tenantService, companyService, divisionService, formatResponse);

router.get('/getAll', userController.getUsers.bind(userController));
router.get('/getOne/:user_id', userController.getUser.bind(userController));
router.put('/update/:user_id', validate(userRule.update), userController.updateUser.bind(userController));
router.delete('/delete/:user_id', userController.deleteUser.bind(userController));
router.post('/create', validate(userRule.create), userController.createUser.bind(userController));

module.exports=router;

