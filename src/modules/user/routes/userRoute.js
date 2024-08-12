const express =require('express');
const PrismaClientFactory = require('../../../database/prismaClientFactory');
const UserService = require('../services/UserService');
const UserController = require('../controllers/UserController');
const userRule = require('./../rules/UserRules')
const validate = require(process.cwd() + '/src/utility/validation')

const router = express.Router();

const prismaDB1 = PrismaClientFactory.createInstanceDB1();
const userService = new UserService(prismaDB1);
const userController = new UserController(userService);

router.get('/getAll', userController.getUsers.bind(userController));
router.get('/getOne/:EmployeeCode', userController.getUser.bind(userController));
router.put('/update/:EmployeeCode', userController.updateUser.bind(userController));
router.delete('/delete/:EmployeeCode', userController.deleteUser.bind(userController));
router.post('/create', validate(userRule.create), userController.createUser.bind(userController));

module.exports=router;

