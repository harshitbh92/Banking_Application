const express = require('express');
const { LoginUser } = require('../controllers/LoginCtrl');

const router = express.Router();

router.post('/loginUser',LoginUser);

module.exports = router;