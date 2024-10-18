const { Router } = require('express');
const { regionCotroller } = require('./controller');
const router = Router();
const { checkToken } = require('../../middleware/checkToken');

router.post('/regions', checkToken, regionCotroller.regionCreate.bind(regionCotroller));
router.post('/regionDelete', checkToken, regionCotroller.deleteRegion.bind(regionCotroller));

module.exports = {router}