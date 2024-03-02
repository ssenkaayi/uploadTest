
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
    if(!supplier) return res.status(400).json({"message":'supplier with id doesnt exist'})

    //assigning supplier_id and trip_id so as to be able to update the weight field
    
    const supplier_id = supplier._id
    // console.log(supplier)
    const trip_id = supplier.trip._id

    //creating new client
    
    const create_client = await Client.create({...req.body,supplier:{_id:supplier._id,name:supplier.name}})
   
    //updating supplier number of clients

    const updatedSupplier = await Supplier.findByIdAndUpdate({_id:supplier_id},{$push:{clients:{name:create_client.name,
    _id:create_client.id,weight:create_client.weight}}},{new:true})

   //updating supplier weight
    const arr = updatedSupplier.clients
    let new_supplier_weight = 0;
    for (let i = 0; i < arr.length; i++) {
        new_supplier_weight += arr[i].weight;
    }

    await Supplier.findByIdAndUpdate({_id:supplier_id},{$set:{number_clients:arr.length,
    weight:new_supplier_weight,}},{new:true})

    // console.log(updatedSupplierWeight)
    // const trip = await Trip.findOne({'suppliers._id':supplier_id})
    // if(!trip) return res.status(400).send('supplier with id doesnt exist')
    // console.log(trip)

    const supplier_trip = await Trip.findOneAndUpdate({'suppliers._id':supplier_id},
    {$set:{'suppliers.$':{name:supplier.name,_id:supplier_id,weight:new_supplier_weight}}},{new:true})
    if(!supplier_trip) res.status(400).json({"message":"failed to update supplier trip"})
    // console.log(supplier_trip.suppliers)

    //updating trip weight


    console.log(supplier_trip.suppliers.length)
    let new_trip_weight = 0;
    for (let i = 0; i < supplier_trip.suppliers.length; i++) {
     new_trip_weight += supplier_trip.suppliers[i].weight;
    }

    console.log(new_trip_weight)

    await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:new_trip_weight}},{new:true})

    // sending response to the client
    
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

        const client = await Client.findById(req.params.id)
        if(!client) return res.status(400).json({"message":'client with id doesnt exist'})
        const client_id = client._id
        // console.log(client)
        const supplier_id = client.supplier._id
 
        const supplier = await Supplier.findById(supplier_id)
        if(!supplier) return res.status(400).json({"message":'supplier with id doesnt exist'})
        console.log(supplier)
    
        // assigning supplier_id and trip_id so as to be able to update the weight field
        
        const trip_id = supplier.trip_id
    
        const updatedSupplier = await Supplier.findOneAndUpdate({'clients.name':client.name},{$pull:{'clients.$':{name:client.name,
        _id:client._id,weight:client.weight}}},{new:true})
        
        // const updatedSupplier = await Supplier.findOne({'clients.name':client.name})
        // console.log(client._id)
        if(!updatedSupplier) return res.status(400).json({"message":'client with id doesnt exist'})
        console.log(updatedSupplier)
        
    
       //updating supplier weight
    //    const arr = updatedSupplier.clients.weight
    //    let new_supplier_weight = 0;
    //    for (let i = 0; i < arr.length; i++) {
    //     new_supplier_weight += arr[i];
    //    }
    //    console.log(new_supplier_weight)
    
    //    const supplier_trip = await Trip.findOneAndUpdate({'suppliers._id':supplier_id},{$set:{'suppliers.$':{name:supplier.name,_id:supplier_id,weight:new_supplier_weight}}},{new:true})
    //    if(!supplier_trip) res.status(400).json({"message":"failed to update supplier trip"})
    //    console.log(supplier_trip)
    
    //     //updating trip weight
    
    //     // const  = updatedSupplier.client_weight
    //     let new_trip_weight = 0;
    //     for (let i = 0; i < supplier_trip.suppliers.length; i++) {
    //      new_trip_weight += supplier_trip.suppliers[i].weight;
    //     }
    
    //     await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:new_trip_weight}},{new:true})
    //     console.log()
    
    //     // sending response to the client
        
    //     await Client.findByIdAndDelete(req.params.id)
        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}