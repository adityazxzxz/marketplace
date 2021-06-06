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
    }
})

module.exports = User = mongoose.model("users",userSchema)