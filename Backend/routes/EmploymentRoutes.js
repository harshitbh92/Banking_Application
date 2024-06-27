const express = require('express');
const { CreateEmployment } = require('../controllers/EmplooymentCtrl');

const router = express.Router();

router.post('/create-employment',CreateEmployment);

module.exports = router;