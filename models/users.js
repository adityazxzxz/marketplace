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
        type:Number
    }
})

module.exports = User = mongoose.model("users",userSchema)