const { Router } = require('express');
const router = Router();
const { router: user } = require('./users/router');
const { router: api } = require('./renders/routes');
const { router: login } = require('./auth/router');
const { router: states } = require('./state/router');
const { router: region } = require('./region/router');
const { router: district } = require('./district/router');

router.use('/', user);
router.use('/api', api);
router.use('/', login);
router.use('/', states);
router.use('/', region);
router.use('/', district);

module.exports = { router }