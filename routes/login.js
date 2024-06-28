const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login-controller');

/* GET home page. */
router.get('/', loginController.get);
router.post('/', loginController.post);

module.exports = router;
