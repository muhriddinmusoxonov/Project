const { Router } = require('express');
const { stateController } = require('./controller');
const {checkToken} = require('../../../middleware/checkToken')
const router = Router();

router.get('/', checkToken, stateController.renderState.bind(stateController));

module.exports = {router}