
import asyncHandler from 'express-async-handler'
import Trip from '../model/tripModel.js';
import errorHandler from '../errorHandler.js';
import Supplier from '../model/supplierModel.js';
import Client from '../model/clientModel.js';


export const createClient = asyncHandler(async(req,res,next)=>{

    // const {error} = luggageValidation(req.body)
  
    // if(error) return next(errorHandler(400,error.details[0].message))


    //checking if the supplier exists with the supplier_id in the client table

    const supplier = await Supplier.findById(req.params.id)
    if(!supplier) return res.status(400).send('supplier with id doesnt exist')

    //assigning supplier_id and trip_id so as to be able to update the weight field
    
    const supplier_id = supplier._id

    const trip_id = supplier.trip_id

    //creating new client
    
    const create_client = await Client.create({...req.body,supplier_name:supplier.name,supplier_id:supplier_id})
   
    //updating supplier number of clients

    const updatedSupplier = await Supplier.findByIdAndUpdate({_id:supplier_id},{$push:{client_name:create_client.name,
    client_id:create_client.id,client_weight:create_client.weight}},{new:true})



   //updating supplier weight
   const arr = updatedSupplier.client_weight
   let new_supplier_weight = 0;
   for (let i = 0; i < arr.length; i++) {

    new_supplier_weight += arr[i];
    
     
   }


    const updatedSupplierWeight = await Supplier.findByIdAndUpdate({_id:supplier_id},{$set:{number_clients:arr.length,
    weight:new_supplier_weight,}},{new:true})

    console.log(updatedSupplierWeight)




    //updating trip weight

    
    const updatedTrip = await Trip.findByIdAndUpdate({_id:trip_id},{$push:{supplier_weight:new_supplier_weight,}},{new:true})

    // const  = updatedSupplier.client_weight
    let new_trip_weight = 0;
    for (let i = 0; i < updatedSupplier.client_weight.length; i++) {
 
     new_trip_weight += arr[i];
     
    }


    await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:new_trip_weight}},{new:true})
    console.log()

    //sending response to the client
    res.status(200).send(create_client)
   
})


export const getClients = async(req,res,next)=>{

    try{

        const client = await Client.find()
        if(client==undefined) return res.status(400).send('no packages for clients')

        res.status(200).json(client)
       

    }catch(error){


        next(error)
    }

}

export const getClient = asyncHandler(async(req,res)=>{


    const isClient = await Client.findById(req.params.id)
    if(!isClient) return res.status(400).send('you are not authorise to view client data')
  
    // const {password:pass,...rest} = isEmploye._doc
    res.status(200).send(isClient)
   
})

export const  deleteClient = async(req,res,next)=>{

    try{
 

        await Client.findByIdAndDelete(req.params.id)

        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}