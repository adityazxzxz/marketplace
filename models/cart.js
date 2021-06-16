const mongoose = require('mongoose')

const schema = mongoose.Schema

const cartSchema = new schema({
    itemId:{
        type:String
    },
    itemName:{
        type:String
    },
    price:{
        type:Number
    },
    qty:{
        type:Number
    },
    merchantId:{
        type:String
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    }
})

module.exports = cartSchema