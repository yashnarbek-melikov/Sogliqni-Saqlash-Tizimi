const express = require('express');
const router = express.Router();

router.use('/patients', require('./patients_route'));
router.use('/appointments', require('./appointments_route'));

module.exports = router;
