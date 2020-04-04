const express = require("express");
const router = express.Router();

const controller = require('../controllers/account.controller');

router.post('/', controller.register);

module.exports = router;