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

        const trips = await Trip.find().sort({createdAt:-1}).limit(24)
        if(trips==undefined) return res.status(400).send('no trips found')

        const page  = parseInt (req.query.page)
        const limit = parseInt (req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex  = (page) * limit

        const results = {}
        results.totalTrips = trips.length
        results.pageCount = Math.ceil(trips.length/limit)

        if(lastIndex < trips.length){
            results.next = {
                page: page + 1

            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1
                
            }
        }
        
        results.result = trips.slice(startIndex,lastIndex)

        res.status(200).json(results)
       

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





