var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/verifySignUp');
const authController = require('../controllers/auth.controller')

router.post('/signup',authMiddleware.checkDuplicateUsernameOrEmail,authController.signup);

router.post('/signin',authController.signin);

module.exports = router;