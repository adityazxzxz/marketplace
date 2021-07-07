const mongoose = require('mongoose')
const schema = mongoose.Schema;

const itemsSchema = new schema({
    merchantId:{
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
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date
    },
    rating:[{
        userId:{
            type:String
        },
        rate:{
            type:Number
        },
        comment:{
            type:String,
            default:null
        },
        createdAt:{
            type:Date
        }
    }],
    image:[{
        title:{
            type:String
        },
        url:{
            type:String
        },
        createdAt:{
            type:Date
        }
    }]


})

module.exports = Item = mongoose.model("items",itemsSchema)