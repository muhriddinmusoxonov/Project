const { Router } = require('express');
const { loginController } = require('./controller');
const router = Router();

router.get('/', loginController.renderLogin.bind(loginController));

module.exports = {router}