const express = require('express');
const { createTransaction } = require('../controllers/TransactionCtrl');
const router = express.Router();

router.post('/create-transaction',createTransaction);

module.exports = router;
