const { Router } = require('express');
const { authController } = require('./controller');
const router = Router();

router.post('/login', authController.generateToken.bind(authController));

module.exports = {router}