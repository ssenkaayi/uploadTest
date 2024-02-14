import Joi from "joi";


export const registerValidation = (data)=>{

    const schema = Joi.object({

        firstName:Joi.string().min(5).required(),
        lastName:Joi.string().min(5).required(),
        email:Joi.string().min(5).required(),
        phone:Joi.string().min(10).required(),
        password:Joi.string().min(3).required(),
        address:Joi.string().min(3).required(),
        role:Joi.string().min(3).required()
    })

    return schema.validate(data)
}

export const loginValidation = (data)=>{

    const schema = Joi.object({

        email:Joi.string().min(5).required(),
        password:Joi.string().min(3).required()
    })

    return schema.validate(data)
}

