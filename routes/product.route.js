const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')

router.get('/', productController.list)
router.post('/', productController.getList)

module.exports = router;