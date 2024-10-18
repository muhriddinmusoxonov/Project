const { Router } = require('express');
const { districtController } = require('./controller');
const router = Router();
const { checkToken } = require('../../middleware/checkToken');

router.post('/district', checkToken, districtController.districtCreate.bind(districtController));
router.post('/districtDelete', checkToken, districtController.deleteDistricts.bind(districtController));

module.exports = {router}