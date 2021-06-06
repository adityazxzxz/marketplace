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
            
            let otpExp = new Date().getTime() + (1*60*60*1000);
            let doc = await user.findOneAndUpdate({phone:req.body.phone},{token:token,otp_expired:otpExp},{new:true})

            return res.status(200).json({
                error:false,
                message:'otp for next step',
                data:{
                    phone:req.body.phone,
                }
            })
        })
}

exports.otp = async (req,res,next) => {
    user.findOne({phone:req.body.phone,otp:req.body.otp}).then(data => {
        if(!data){
            return res.status(400).json({
                error:true,
                message:'otp failed'
            })
        }
        let time = new Date.getTime();
        if(data.otpExp > time){
            return res.status(400).json({
                error:true,
                message:'otp expired'
            })
        }

        return res.status(200).json({
            error:false,
            message:'access token'
        })
    })
}

exports.register = async (req,res,next) => {
    try {
        let hash = bcrypt.hash(req.body.phone,8);
        let store = await user.create({
            phone:req.body.phone,
            password:hash
        })
        return res.status(200).json({
            error:false,
            message:'succeed'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error:true,
            message:'internal error 2'
        })
    }
    
}