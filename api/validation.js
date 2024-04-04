
import Joi from '@hapi/joi'
// import { number } from 'joi'


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

export const tripValidation = (data)=>{

    const schema = Joi.object({

        name:Joi.string().min(4).required(),
        transport:Joi.number().required(),
        tax:Joi.number().required(),
        trip_payment:Joi.number().required(),
        issued_by:Joi.string(4).required()
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
        weight:Joi.number().required(),
        number_pieces:number().required(),
        issued_by:Joi.string().min(3).required(),
        decription:Joi.string(3).required(),
    })

    return schema.validate(data)
}

