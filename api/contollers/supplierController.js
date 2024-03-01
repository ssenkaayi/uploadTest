
import asyncHandler from 'express-async-handler'
import Trip from '../model/tripModel.js';
import errorHandler from '../errorHandler.js';
import Supplier from '../model/supplierModel.js';


export const createSupplier = asyncHandler(async(req,res,next)=>{

    // const {error} = luggageValidation(req.body)
  
    // if(error) return next(errorHandler(400,error.details[0].message))

    const trip = await Trip.findById(req.params.id)
    if(!trip) return next(errorHandler(400,'Trip with provided id doesnt exist'))
    // console.log(trip.name,trip._id)
   
    
    const create_suplier = await Supplier.create({...req.body,trip:{name:trip.name,_id:trip._id}})
    console.log(create_suplier)

    // // const new_trip_weight = trip.weight + create_suplier.weight
    

    const updatedTripPush = await Trip.findByIdAndUpdate({_id:req.params.id},{$push:{suppliers:{name:create_suplier.name,
    _id:create_suplier._id,weight:create_suplier.weight}}},{new:true})
    // console.log(updatedTripPush)

    const new_number_suppliers = (updatedTripPush.suppliers).length
   
    const updatedTripSet = await Trip.findByIdAndUpdate({_id:req.params.id},{$set:{number_suppliers:new_number_suppliers}},{new:true})
    // console.log(updatedTripSet)

    res.status(200).send(create_suplier)
   
})


export const getSuppliers = async(req,res,next)=>{
    try{

        const supplier = await Supplier.find()
        if(supplier==undefined) return res.status(400).send('no trips found')

        res.status(200).json(supplier)
       

    }catch(error){


        next(error)
    }

}

export const  deleteSupplier = async(req,res,next)=>{

    const supplier = await Supplier.findById(req.params.id)

    if(!supplier) return next(errorHandler(401,'Supplier with id is not found'))

    // if(req.user.id!==listing.userRef) return next(errorHandler(401,'you can not authorized delete profile'))

    try{


        await Supplier.findByIdAndDelete(req.params.id)

        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}



