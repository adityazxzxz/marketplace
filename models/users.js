const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp_expired:{
        type:Number
    }
})

module.exports = User = mongoose.model("users",userSchema)