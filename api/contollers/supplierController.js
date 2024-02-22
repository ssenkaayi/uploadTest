
import asyncHandler from 'express-async-handler'
import Luggage from '../model/supplierModel.js';
import Trip from '../model/tripModel.js';
import errorHandler from '../errorHandler.js';
import Supplier from '../model/supplierModel.js';


export const createSupplier = asyncHandler(async(req,res,next)=>{

    // const {error} = luggageValidation(req.body)
  
    // if(error) return next(errorHandler(400,error.details[0].message))

    const trip = await Trip.findById(req.body.trip_id)
    if(!trip) return next(errorHandler(400,'Trip doesnt exist'))
    const id = trip._id
    
    const create_suplier = await Supplier.create({...req.body,trip_name:trip.name})

    // const new_trip_weight = trip.weight + create_suplier.weight
    

    const updatedTripPush = await Trip.findByIdAndUpdate({_id:id},{$push:{supplier_name:create_suplier.name,
    supplier_id:create_suplier.id,}},{new:true})

    const new_number_suppliers = (updatedTripPush.supplier_name).length
   
    const updatedTripSet = await Trip.findByIdAndUpdate({_id:id},{$set:{number_suppliers:new_number_suppliers}},{new:true})
    console.log(updatedTripSet)

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



