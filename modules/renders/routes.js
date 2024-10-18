const { Router } = require('express');
const router = Router();
const { router: register } = require('./register/router');
const { router: login } = require('./login/router');
const { router: state } = require('./state/router');
const { router: region } = require('./regions/router');
const { router: district } = require('./district/router');

router.use('/register', register);
router.use('/login', login);
router.use('/state', state);
router.use('/region', region);
router.use('/district', district);

module.exports = { router }