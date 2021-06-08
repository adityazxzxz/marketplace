const user = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.login = async (req,res,next) => {
        user.findOne({
            phone:req.body.phone,
        }).then(async data => {
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
            let otpCode = Math.floor(100000 + Math.random() * 900000)
            let newData = new user(data);

            newData.otp_expired = otpExp;
            newData.otp_code = otpCode;
            newData.save();

            return res.status(200).json({
                error:false,
                message:'otp for next step',
                data:{
                    phone:req.body.phone,
                }
            })
        }).catch(err => {
            return res.status(500).json({
                error:true,
                message:'internal error'
            })
        })
}

exports.otp = async (req,res,next) => {
    user.findOne({phone:req.body.phone,otp_code:req.body.otp}).then(data => {
        if(!data){
            return res.status(400).json({
                error:true,
                message:'otp failed'
            })
        }
        let time = new Date();
        if(data.otp_expired < time.getTime()){
            return res.status(400).json({
                error:true,
                message:'otp expired'
            })
        }

        let newData = new user(data)
        
        newData.otp_expired = time.getTime();
        newData.save();

        let token = jwt.sign({
            id:data._id,
            phone:data.phone,
        },'ass123Hole')

        return res.status(200).json({
            error:false,
            access_token:token
        })
    })
}

exports.register = async (req,res,next) => {
    try {
        let hash = await bcrypt.hash(req.body.phone,8);
        let userData = await user.findOne({
            phone:req.body.phone,
        })
        if(userData){
            return res.status(400).json({
                error:true,
                message:'phone number already exists'
            })
        }
        let store = await user.create({
            phone:req.body.phone,
            password:hash,
            otp_code:null,
            otp_expired:null,
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