const user = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const users = require('../models/users')

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
            let otpHash = await bcrypt.hash(otpCode.toString(),8)

            newData.otp_expired = otpExp;
            newData.otp_code = otpHash;
            newData.save();

            return res.status(200).json({
                error:false,
                message:'otp for next step',
                data:{
                    phone:req.body.phone,
                    otp:otpCode
                }
            })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({
                error:true,
                message:'internal error'
            })
        })
}

exports.otp = async (req,res,next) => {
    user.findOne({phone:req.body.phone}).then(data => {
        if(!data){
            return res.status(400).json({
                error:true,
                message:'phone number not found'
            })
        }
        let time = new Date();
        let match = bcrypt.compare(req.body.otp,data.otp_code)
        if(!match){
            return res.status(400).json({
                error:true,
                message:'otp failed'
            })
        }
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

exports.addCart = async (req,res,next) => {
    user.findOne({phone:'081283398494'}).then(data => {
        let userData = new user(data)
        userData.cart.push({itemName:'botol3'});
        userData.save()
        return res.status(200).json({
            error:false,
            message:'succeed'
        })
    }).catch(err => {
        return res.status(500).json({
            error:true,
            message:'internal error'
        })
    })
}

exports.removeCart = async (req,res,next) => {
    user.update({
        phone:req.userdata.phone
    },
    {
        $pull:{
            cart:{
                _id:req.body.cartItemId
            }
        }
    }).then(result => {
        return res.status(200).json({
            error:false,
            message:'succeed'
        })
    }).catch(err => {
        return res.status(500).json({
            error:true,
            message:'internal server error'
        })
    })
}

exports.getCart = (req,res,next) => {
    let phone = req.userdata.phone;
    user.findOne({
        phone
    }).then(data => {
        let userdata = new user(data)
        return res.status(200).json({
            error:false,
            data:userdata.cart
        })
    }).catch(err => {
        return res.status(500).json({
            error:true,
            message:'internal server error'
        })
    })
}