const express = require('express');
const router = express.Router();
const { getAccountData } = require('../controllers/account.controller');

router.get('/account-data', getAccountData);

module.exports = router;
