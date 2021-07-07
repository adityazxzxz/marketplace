const jwt = require('jsonwebtoken')
const users = require('../models/users')

module.exports = (req,res,next) => {
    try {
        let token = req.get('Authorization')
        if(token == null){
            return res.status(401).json({
                error:true,
                message:'Unauthorized'
            })

        }
        token = token.replace(/^Bearer\s/,"");

        jwt.verify(token, 'ass123Hole',async (err, decoded) =>{
            if(err){
                return res.status(401).json({
                    error:true,
                    message:'unauthorized'
                })
            }

            let tmp = await req.redis.get(decoded.session)
            if(tmp){
                req.decoded = decoded
                return next()
            }else{
                console.log('redis not found')
            }
        })
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:'internal server error'
        })
    }
}