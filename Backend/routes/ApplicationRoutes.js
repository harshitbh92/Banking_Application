const express = require('express');
const { createApplication } = require('../controllers/ApplicationCtrl');
const router = express.Router();

router.post('/create-application',createApplication);

module.exports = router;