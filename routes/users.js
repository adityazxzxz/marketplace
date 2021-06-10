const express = require('express')
const router = express.Router()
const {validate, loginValidator} = require('../helpers/validator')
const users = require('../controllers/users')

router.post('/login',loginValidator(),validate,users.login)

router.post('/register',users.register)
router.post('/otp',users.otp)
router.get('/cart',users.addCart)

router.get('/',(req,res) => {
    res.status(200).json({data:'api create'})
})

module.exports = router