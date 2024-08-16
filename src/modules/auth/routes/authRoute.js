const express =require('express');
const PrismaClientFactory = require('../../../database/prismaClientFactory');
const AuthService = require('../services/AuthService');
const UserService = require('../../user/services/UserService');
const AuthController = require('../controllers/AuthController');
const authRule = require('../rules/AuthRules')
const validate = require(process.cwd() + '/src/utility/validation')


const router = express.Router();

const prismaDB2 = PrismaClientFactory.createInstanceDB2();

const authService = new AuthService(prismaDB2);
const userService = new UserService(prismaDB2);
const authController = new AuthController(authService, userService);

router.post('/login', validate(authRule.create), authController.doLogin.bind(authController));

module.exports=router;

