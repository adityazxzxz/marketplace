const { body , validationResult } = require('express-validator');

const loginValidator = () => {
    return [
        body('phone').isMobilePhone(),
        body('password').isLength({min:5})
    ]
}

const registerValidator = () => {
    return [
        body('phone').isMobilePhone,
        body('password').isLength({min:5})
        
    ]
}

const validate = (req,res,next) => {
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }

    const extractedError = []
    errors.array().map(err => {
        extractedError.push({[err.param]:err.msg})
    })

    return res.status(422).json({
        errors:extractedError
    })
}


module.exports = {
    validate,
    loginValidator
}