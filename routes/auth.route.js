const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.get('/signup', authController.signUp)
router.post('/signup', authController.postSignUp)
router.post('/login', authController.postLogin)
router.get('/', (req, res) => {
    res.redirect('/signup')
})


module.exports = router;