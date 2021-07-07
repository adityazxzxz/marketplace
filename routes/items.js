const express = require('express')
const router = express.Router()
const {validate, loginValidator} = require('../middleware/validator')
const items = require('../controllers/items')

router.post('/',items.add)
//router.get('/item',items.addCart)

router.get('/',(req,res) => {
    res.status(200).json({data:'api create'})
})

module.exports = router