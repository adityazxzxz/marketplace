const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
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
    saldo:{
        type:Number,
        default:0
    },
    session:{
        type:String
    }
})

module.exports = User = mongoose.model("users",userSchema)