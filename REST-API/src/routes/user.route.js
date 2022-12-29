var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ storagex: multer.memoryStorage({}) })
const authMiddleware = require('../middleware/verifySignUp');
const authController = require('../controllers/auth.controller')

router.post('/signup',authMiddleware.checkDuplicateUsernameOrEmail,authController.signup);

router.post('/signin',authController.signin);

router.post('/update-profile', upload.single('image'), authController.updateProfile);

module.exports = router;