
import Joi from '@hapi/joi'
// import { number } from 'joi'


export const registerValidation = (data)=>{

    const schema = Joi.object({

        firstName:Joi.string().min(3).max(20).required(),
        lastName:Joi.string().min(3).max(20).required(),
        email:Joi.email().min(5).max(20).required(),
        phone:Joi.string(10).min(7).max(20).required(),
        password:Joi.string().min(3).max(20).required(),
        address:Joi.string(20).min(3).required(),
        role:Joi.string().min(3).max(20).required()
    })

    return schema.validate(data)
}

export const loginValidation = (data)=>{

    const schema = Joi.object({

        email:Joi.string().min(5).max(20).required(),
        password:Joi.string().min(3).max(20).required()
    })

    return schema.validate(data)
}

export const tripValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).required(),
        transport:Joi.number().required().min(0),
        tax:Joi.number().required().min(0),
        trip_payment:Joi.number().required().min(0),
        market_fees:Joi.number().required().min(0),
        issued_by:Joi.string().required().min(3)
    })

    return schema.validate(data)
}

export const supplierValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).required(),
        issued_by:Joi.string().min(3).required()
    })

    return schema.validate(data)
}

export const clientValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(3).required(),
        weight:Joi.number().required().min(0.1),
        number_pieces:Joi.number().required().min(1),
        issued_by:Joi.string().min(3).required(),
        description:Joi.string().required(),
    })

    return schema.validate(data)
}

