const mongoose = require('mongoose');
const cartSchema = require('./cart')
const schema = mongoose.Schema;

const userSchema = new schema({
    name:{
        type:String
    },
    phone:{
        type:Number,
    },
    password:{
        type:String,
    },
    otp_expired:{
        type:Number
    },
    otp_code:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date
    },
    saldo:{
        type:Number,
        default:0
    },
    session:{
        type:String
    },
    status:{
        type:Number,
    },
    ref_id:{
        type:Number
    },
    g_id:{
        type:String
    },
    cart:[{
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
    }]
})

module.exports = User = mongoose.model("users",userSchema)