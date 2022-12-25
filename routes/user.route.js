const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/login', userController.login)
router.post('/login', userController.postLogin)
router.get('/logout', userController.logOut)
router.get('/', (req, res) => {
    res.redirect('/product')
})


module.exports = router;