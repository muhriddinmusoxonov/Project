const { Router } = require('express');
const { statesController } = require('./controller');
const { checkToken } = require('../../middleware/checkToken');
const router = Router();

router.post('/states', checkToken, statesController.createState.bind(statesController));
router.post('/stateDelete', checkToken, statesController.deleteState.bind(statesController));

module.exports = {router}