const express = require('express');
const PrismaClientFactory = require(process.cwd() + '/src/database/prismaClientFactory');
const RoleService = require('../services/RoleService');
const RoleController = require('../controllers/RoleController');
const roleRule = require('../rules/RoleRules')
const validate = require(process.cwd() + '/src/utility/validation')
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');

const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const roleService = new RoleService(prismaDB2);
const roleController = new RoleController(roleService, formatResponse);

router.get('/getAll', roleController.getAllRoles.bind(roleController));
router.post('/create', validate(roleRule.create), roleController.createRole.bind(roleController));
router.get('/getOne/:code', roleController.getRole.bind(roleController));
router.put('/update/:code', roleController.updateRole.bind(roleController));
router.delete('/delete/:code', roleController.deleteRole.bind(roleController));

module.exports = router;

