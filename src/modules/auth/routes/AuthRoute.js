const express =require('express');
const PrismaClientFactory = require(process.cwd() +'/src/database/prismaClientFactory');
const AuthService = require('../services/AuthService');
const UserService = require('../../employee/user/services/UserService');
const AuthController = require('../controllers/AuthController');
const authRule = require('../rules/AuthRules')
const validate = require(process.cwd() + '/src/utility/validation')
const formatResponse = require(process.cwd() + '/src/utility/responseFormatter');

const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const authService = new AuthService(prismaDB2);
const userService = new UserService(prismaDB2);
const authController = new AuthController(authService, userService, formatResponse);

router.post('/login', validate(authRule.create), authController.doLogin.bind(authController));

module.exports=router;

