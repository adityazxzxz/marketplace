const items = require('../models/items')

exports.getItem = async (req,res,next) => {
    let limit = 5;
    try {
        let offset = req.query.page ? req.query.page * limit : 1;
        let cond = req.query.search ? {"itemName":{$regex:req.query.search}} : {}
        let item = await items.find(cond).limit(limit).skip(offset);
        let total = await items.find(cond).count();
        return res.status(200).json({
            error:false,
            data:item,
            total
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message:'internal error server'
        })
    }
}

exports.add = async (req,res,next) => {
    try {
        await items.create({
            merchantId:req.body.merchantid,
            itemName:req.body.itemname,
            price:req.body.price,
            qty:req.body.qty,
            description:req.body.description,
            image:[{
                title:'tes',
                url:'urltes'
            }]
        })

        return res.status(200).json({
            error:false,
            message:'Succeed'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:true,
            message:'internal error server'
        })
    }
}

exports.detail = (req,res,next) => {
    items.findOne({_id:req.body.id}).then(data => {
        return res.status(200).json({
            error:false,
            data
        })
    }).catch(err => {
        return res.status(500).json({
            error:true,
            message:'internal server error'
        })
    })
}