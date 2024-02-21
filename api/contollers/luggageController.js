
import { luggageValidation} from '../validation.js'
import asyncHandler from 'express-async-handler'
import Luggage from '../model/luggageModel.js';
import Trip from '../model/tripModel.js';
import errorHandler from '../errorHandler.js';


export const createLuggage = asyncHandler(async(req,res)=>{

    const {error} = luggageValidation(req.body)
  
    if(error) return next(errorHandler(400,error.details[0].message))

    const skyTeamExist = await Trip.findById(req.body.trip_id)
    if(!skyTeamExist) return next(errorHandler(400,'Trip doesnt exist'))
    console.log(skyTeamExist)

    const createLuggage = await Luggage.create({...req.body,skyTeamName:skyTeamExist.skyTeamName})
    if(!createLuggage) return next(errorHandler(400,'error creating luggage'))
    console.log(createLuggage)
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

export const  deleteLuggage = async(req,res,next)=>{

    const luggage = await Luggage.findById(req.params.id)

    if(!luggage) return next(errorHandler(401,'Trip with id is not found'))

    // if(req.user.id!==listing.userRef) return next(errorHandler(401,'you can not authorized delete profile'))

    try{


        await Luggage.findByIdAndDelete(req.params.id)

        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}



