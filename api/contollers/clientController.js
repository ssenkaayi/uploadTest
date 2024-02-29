
import asyncHandler from 'express-async-handler'
import Trip from '../model/tripModel.js';
import errorHandler from '../errorHandler.js';
import Supplier from '../model/supplierModel.js';
import Client from '../model/clientModel.js';


export const createClient = asyncHandler(async(req,res,next)=>{

    // const {error} = luggageValidation(req.body)
  
    // if(error) return next(errorHandler(400,error.details[0].message))


    //checking if the supplier exists with the supplier_id in the client table

    const supplier = await Supplier.findById(req.body.supplier_id)
    if(!supplier) return res.status(400).send('supplier doesnt exist')

    //assigning supplier_id and trip_id so as to be able to update the weight field
    
    const supplier_id = supplier._id

    const trip_id = supplier.trip_id

    //creating new client
    
    const create_client = await Client.create({...req.body,supplier_name:supplier.name})
   
    //updating supplier number of clients

    const updatedSupplier = await Supplier.findByIdAndUpdate({_id:supplier_id},{$push:{client_name:create_client.name,
    client_id:create_client.id,}},{new:true})



   //updating supplier weight

    const new_number_client = (updatedSupplier.client_name)
   
    const new_supplier_weight = updatedSupplier.weight + create_client.weight

    const updatedSupplierWeight = await Supplier.findByIdAndUpdate({_id:supplier_id},{$set:{number_clients:new_number_client.length,
        weight:new_supplier_weight,}},{new:true})


    //updating trip weight

    const trip_weight = await Trip.findById(trip_id)
    const updated_trip_weight = (trip_weight.weight + create_client.weight)

    await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:updated_trip_weight}},{new:true})
    // console.log(updatedTripWeight)

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


    const client = await Client.findById(req.params.id)
    if(!client) return res.status(400).send('client not found')

    try{
        console.log(client)
        const _id = client._id
        console.log(_id)
        const supplier_id = client.supplier_id
        // console.log(supplier_id)

        const supplier = await Supplier.findById(supplier_id)
        if(!supplier) return next(errorHandler(401,'supplier with id is not found'))

        const trip_id = supplier.trip_id
        // console.log(supplier)

         //updating supplier number of clients

        const updatedSupplier = await Supplier.findByIdAndUpdate({_id:supplier_id},{$pull:{client_name:client.name,
        client_id:client._id,}},{new:true})
    
       //updating supplier weight
    
        const new_number_client = (updatedSupplier.client_name)
       
        const new_supplier_weight = updatedSupplier.weight - client.weight
    
        const updatedSupplierWeight = await Supplier.findByIdAndUpdate({_id:supplier_id},{$set:{number_clients:new_number_client.length,
        weight:new_supplier_weight,}},{new:true})
    
        // console.log(updatedSupplierWeight)
        
        //updating trip weight
    
        const trip = await Trip.findById(trip_id)
        if(!trip) return next(errorHandler(401,'trip with id is not found'))

        const updated_trip_weight = (trip_weight.weight - client.weight)

        await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:updated_trip_weight}},{new:true})

        await Client.findByIdAndDelete(req.params.id)

        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}