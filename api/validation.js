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

export const tripValidation = (data)=>{

    const schema = Joi.object({

       
        skyTeamName:Joi.string().min(5).required(),
        weight:Joi.number().min(1).required(),
        numberLuggages:Joi.number().min(1).required(),
        supplierName:Joi.string().min(3).required(),
        issuedBy:Joi.string().min(3).required()
    })

    return schema.validate(data)
}

export const luggageValidation = (data)=>{

    const schema = Joi.object({

       
        skyTeamName:Joi.string().min(5).required(),
        weight:Joi.number().min(1).required(),
        numberLuggages:Joi.number().min(1).required(),
        supplierName:Joi.string().min(3).required(),
        clientName:Joi.string().min(3).required(),
        issuedBy:Joi.string().min(3).required()
    })

    return schema.validate(data)
}

// export const getValidation = (data)=>{

//     const schema = Joi.object({

//         // _id:Joi.string().required()
//     })

//     return schema.validate(data)
// }
