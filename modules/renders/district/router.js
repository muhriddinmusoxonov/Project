const { Router } = require('express');
const {districtController } = require('./controller');
const router = Router();
const { checkToken } = require('../../../middleware/checkToken');

router.get('/', checkToken, districtController.renderDistrict.bind(districtController));

module.exports = {router}