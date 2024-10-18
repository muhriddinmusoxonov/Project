const { Router } = require('express');
const {regionController } = require('./controller');
const router = Router();
const { checkToken } = require('../../../middleware/checkToken');

router.get('/', checkToken, regionController.renderRegion.bind(regionController));

module.exports = {router}