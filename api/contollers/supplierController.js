
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

        const suppliers = await Supplier.find()
        if(suppliers==undefined) return res.status(400).send('no trips found')
        
        const page  = parseInt (req.query.page)
        const limit = parseInt (req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex  = (page) * limit

        const results = {}
        results.totalSuppliers = suppliers.length
        results.pageCount = Math.ceil(suppliers.length/limit)

        if(lastIndex < suppliers.length){
            results.next = {
                page: page + 1

            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1
                
            }
        }
        
        results.result = suppliers.slice(startIndex,lastIndex)


        res.status(200).json(results)
       

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

export const getSupplier = asyncHandler(async(req,res)=>{


    const isSupplier = await Supplier.findById(req.params.id)
    if(!isSupplier) return next(errorHandler(400,'you are not authorise to view client data')) 
  
    // const {password:pass,...rest} = isEmploye._doc
    res.status(200).send(isSupplier)
   
})



