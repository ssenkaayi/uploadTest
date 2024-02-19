import { tripValidation  } from '../validation.js'
import asyncHandler from 'express-async-handler'
import Trip from '../model/tripModel.js';


export const createTrip = asyncHandler(async(req,res)=>{

    const {error} = tripValidation(req.body)
  
    if(error) return res.status(400).send(error.details[0].message)

    const createTrip = await Trip.create(req.body)
    res.status(200).send(createTrip)
   
  
})


export const getTrips = async(req,res,next)=>{
    try{

        const trips = await Trip.find()
        if(trips==undefined) return res.status(400).send('no trips found')

        res.status(200).json(trips)
       

    }catch(error){


        next(error)
    }

}



