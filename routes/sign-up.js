const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/sign-up-controller');

/* GET home page. */
router.get('/', signUpController.get);
router.post('/', signUpController.post);

module.exports = router;
