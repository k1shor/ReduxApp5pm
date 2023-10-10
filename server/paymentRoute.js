const express = require('express')
const { processPayment } = require('./paymentController')
const router = express.Router()

router.post('/processPayment', processPayment)

module.exports = router