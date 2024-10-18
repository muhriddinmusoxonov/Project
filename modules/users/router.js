const { Router } = require('express');
const { userController } = require('./controller');
const { checkToken } = require('../../middleware/checkToken');
const router = Router();

router.get('/', checkToken, userController.getAll.bind(userController));
router.post('/register', userController.creatUser.bind(userController));
router.post('/userDelete', userController.deleteUser.bind(userController));

module.exports = {router}