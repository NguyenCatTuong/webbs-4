const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.get('/signup', authController.signUp)
router.post('/signup', authController.postSignUp)
router.get('/login', authController.login)
// router.post('/login', authController.postLogin)

module.exports = router;