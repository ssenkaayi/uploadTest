import { tripValidation  } from '../validation.js'
import asyncHandler from 'express-async-handler'
import Trip from '../model/tripModel.js';
import Supplier from '../model/supplierModel.js';


export const createTrip = asyncHandler(async(req,res)=>{

    // const {error} = tripValidation(req.body)
    // if(error) return res.status(400).send(error.details[0].message)

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

export const  deleteTrip = async(req,res,next)=>{

    const trip = await Trip.findById(req.params.id)

    if(!trip) return next(errorHandler(401,'Trip with id is not found'))

    // if(req.user.id!==listing.userRef) return next(errorHandler(401,'you can not authorized delete profile'))

    try{


        await Trip.findByIdAndDelete(req.params.id)

        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}


export const getTrip = asyncHandler(async(req,res)=>{


    const isTrip = await Trip.findById(req.params.id)
    if(!isTrip) return next(errorHandler(400,'you are not authorise to view client data')) 

    // const isSupplier = await Supplier.find({'trip._id':req.params.id},)
    // if(!isSupplier) return next(errorHandler(400,'you are not authorise to view client data')) 
  
    // const {password:pass,...rest} = isEmploye._doc
    res.status(200).send(isTrip)
   
})

// export const getSupplier = asyncHandler(async(req,res)=>{


//     const tripExist = await Trip.findById(req.params.id)
//     if(!tripExist) return next(errorHandler(401,'you can only view your own listing'))

//     const isSupplier = await Supplier.find({'trip._id':req.params.id},)
//     // if(!isSupplier) return next(errorHandler(400,'you are not authorise to view client data')) 
  
//     res.status(200).send(isSupplier)
   
// })



