const user = require('../models/users')
const jwt = require('jsonwebtoken')

exports.login = async (req,res,next) => {
        user.findOne({
            phone:req.body.phone,
        }).then(data => {
            if(!data){
                return res.status(400).json({
                    error:true,
                    message:'phone or password incorrect'
                })
            }

            let match = bcrypt.compare(req.body.password, data.password);
            if(!match){
                return res.status(400).json({
                    error:true,
                    message:'phone or password incorrect'
                })
            }

            let token = md5(req.body.phone + Date.now());
            
            await user.findOneAndUpdate({phone:req.body.phone},{token:token},{new:true})

            return res.status(200).json({
                error:false,
                message:'otp for next step',
                data:{
                    token,
                    otp:data.otp
                }
            })

            let accessToken = jwt.sign({
                id:data._id,
                phone:data.phone
            },'ass123Hole')

            let




        })
}

exports.register = async (req,res,next) => {
    try {
        let store = await user.create({
            phone:'0812123123',
            password:'123123'
        })
        return res.status(200).json({
            error:false,
            message:'oke'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error:true,
            message:'internal error 2'
        })
    }
    
}