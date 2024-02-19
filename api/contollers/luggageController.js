
import { luggageValidation} from '../validation.js'
import asyncHandler from 'express-async-handler'
import Luggage from '../model/luggageModel.js';


export const createLuggage = asyncHandler(async(req,res)=>{

    const {error} = luggageValidation(req.body)
  
    if(error) return res.status(400).send(error.details[0].message)

    const createLuggage = await Luggage.create(req.body)
    res.status(200).send(createLuggage)
   
  
})


export const getLuggages = async(req,res,next)=>{
    try{

        const luggages = await Luggage.find()
        if(luggages==undefined) return res.status(400).send('no trips found')

        res.status(200).json(luggages)
       

    }catch(error){


        next(error)
    }

}



