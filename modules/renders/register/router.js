const { Router } = require('express');
const { registerController } = require('./controller');
const router = Router();

router.get('/', registerController.renderRegister.bind(registerController));

module.exports = {router}