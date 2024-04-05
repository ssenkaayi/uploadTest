
import asyncHandler from 'express-async-handler'
import Trip from '../model/tripModel.js';
import errorHandler from '../errorHandler.js';
import Supplier from '../model/supplierModel.js';
import Client from '../model/clientModel.js';
import { clientValidation } from '../validation.js';



export const createClient = asyncHandler(async(req,res,next)=>{
    // console.log(req.body)

    const {error} = clientValidation(req.body)
  
    if(error) return next(errorHandler(400,error.details[0].message))

    // console.log(req.body)


    //checking if the supplier exists with the supplier_id in the client table

    const supplier = await Supplier.findById(req.params.id)
    if(!supplier) return res.status(400).json({"message":'supplier with id doesnt exist'})
    console.log(supplier)

    //assigning supplier_id and trip_id so as to be able to update the weight field
    
    const supplier_id = supplier._id
    // console.log(supplier)
    const trip_id = supplier.trip._id

    //creating new client
    
    const create_client = await Client.create({...req.body,supplier:{_id:supplier._id,supplier_name:supplier.name},
        trip:{_id:supplier.trip._id,name:supplier.trip.name}})
   
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
    weight:new_supplier_weight.toFixed(2),}},{new:true})

    const supplier_trip = await Trip.findOneAndUpdate({'suppliers._id':supplier_id},
    {$set:{'suppliers.$':{name:supplier.name,_id:supplier_id,weight:new_supplier_weight.toFixed(2)}}},{new:true})
    if(!supplier_trip) res.status(400).json({"message":"failed to update supplier trip"})
    // console.log(supplier_trip.suppliers)

    //updating trip weight

    console.log(supplier_trip.suppliers.length)
    let new_trip_weight = 0;
    for (let i = 0; i < supplier_trip.suppliers.length; i++) {
     new_trip_weight += supplier_trip.suppliers[i].weight;
    }

    // console.log(new_trip_weight)

    await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:new_trip_weight.toFixed(2)}},{new:true})

    // sending response to the client
    
    res.status(200).send(create_client)
   
})


export const getClients = async(req,res,next)=>{

    try{

        const clients = await Client.find().sort({createdAt:-1}).limit(24)
        if(clients===undefined) return res.status(400).send('no packages for clients')

        const page  = parseInt (req.query.page)
        const limit = parseInt (req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex  = (page) * limit

        const results = {}
        results.totalClients = clients.length
        results.pageCount = Math.ceil(clients.length/limit)

        if(lastIndex < clients.length){
            results.next = {
                page: page + 1

            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1
                
            }
        }
        
        results.result = clients.slice(startIndex,lastIndex)
        res.status(200).json(results)

    }catch(error){


        next(error)
    }

}

export const getClient = asyncHandler(async(req,res)=>{


    const isClient = await Client.findById(req.params.id)
    if(!isClient) return next(errorHandler(400,'you are not authorise to view client data')) 
  
    // const {password:pass,...rest} = isEmploye._doc
    res.status(200).send(isClient)
   
})



export const  deleteClient = async(req,res,next)=>{

    try{

        const client = await Client.findById(req.params.id)
        if(!client) return res.status(400).json({"message":'client with id doesnt exist'})
        // const client_id = client._id
        // console.log(client)
        const supplier_id = client.supplier._id
 
        const supplier = await Supplier.findById(supplier_id)
        const trip_id = supplier.trip._id
        if(!supplier) return res.status(400).json({"message":'supplier with id doesnt exist'})
        // console.log(supplier)
    
        // assigning supplier_id and trip_id so as to be able to update the weight field
        
        const updatedSupplier = await Supplier.findOneAndUpdate({'clients._id':client._id},{$pull:{clients:{name:client.name,
        _id:client._id,weight:client.weight}}},{new:true})
        // console.log(updatedSupplier.clients.length)
        
        //updating supplier weight
       const arr = updatedSupplier.clients
       let new_supplier_weight = 0.0;
       for (let i = 0; i < arr.length; i++) {
        new_supplier_weight += arr[i].weight;
       }
    //    console.log(new_supplier_weight)

       await Supplier.findByIdAndUpdate({_id:supplier_id},{$set:{number_clients:arr.length,
        weight:new_supplier_weight.toFixed(2),}},{new:true})
    
       const supplier_trip = await Trip.findOneAndUpdate({'suppliers._id':supplier_id},
       {$set:{'suppliers.$':{name:supplier.name,_id:supplier_id,weight:new_supplier_weight.toFixed(2)}}},{new:true})
       if(!supplier_trip) res.status(400).json({"message":"failed to update supplier trip"})
    //    console.log(supplier_trip)
    
        //updating trip weight
    
        // const  = updatedSupplier.client_weight
        let new_trip_weight = 0.0;
        for (let i = 0; i < supplier_trip.suppliers.length; i++) {
         new_trip_weight += supplier_trip.suppliers[i].weight;
        }
        // console.log(new_trip_weight)
        // console.log(supplier_trip)
        const trip = await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:new_trip_weight.toFixed(2)}},{new:true})
        // console.log(trip)
        if(!trip) return res.status(400).json({"message":"trip with id is not found"})
    
        // sending response to the client
        
        await Client.findByIdAndDelete(req.params.id)
        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}


export const searchClient = async(req,res,next)=>{

    try{

        // we use options:'i' method to remove search sensitivity

        const search = await Client.find(
            {
                "$or" : [
                    {
                        // name:{$regex:req.params.key , $options:'i'},
                        createdAt: {$gt: req.params.key},
                        // supplier:{$regex:req.params.key , $options:'i'}
                        // createdAt:{$regex:req.params.key}
        
                    },
                    {
                        name:{$regex:req.params.key , $options:'i'},
                        // createdAt: {$gt: req.params.key},
                        // supplier:{$regex:req.params.key , $options:'i'}
                        // createdAt:{$regex:req.params.key}
        
                    },

                ]
            }
        ).sort({createdAt:-1})

        res.status(200).json(search)
      
        

    }catch(error){
        next(error)
    }

}

export const updateClient = async(req,res,next)=>{

    // console.log(req.body)

    const client = await Client.findById(req.params.id)
    if(!client) next(errorHandler(402,"client with id is not found"))

    const client_id = req.params.id
    const supplier_id = client.supplier._id
    
    const supplier = await Supplier.findById(supplier_id)
    if(!supplier) next(errorHandler(402,"supplier with this id doesnt exist"))

    const trip_id = supplier.trip._id

    const trip = await Trip.findById(trip_id)
    if(!trip) next(errorHandler(402,"trip with with this id doesn't exist "))

    try{

        // const updateSupplier = await Supplier.findOne({'clients._id':client_id})
        // console.log(updateSupplier)
        // if(!updateSupplier) next(errorHandler(401,'client in supplier not found'))
        
        const updateSupplier = await Supplier.findOneAndUpdate({'clients._id':client_id},
        {$set:{'clients.$':{name:req.body.name,weight:req.body.weight,_id:req.body._id}}},{new:true})
        if(!updateSupplier) next(errorHandler(402,"updating clients document in the supplier document failed"))
        // console.log(updateSupplier)

        const arr = updateSupplier.clients
        let new_supplier_weight = 0.0;
        for (let i = 0; i < arr.length; i++) {
         new_supplier_weight += arr[i].weight;
        }
        // console.log(new_supplier_weight)

        await Supplier.findByIdAndUpdate({_id:supplier_id},{$set:{weight:new_supplier_weight,number_clients:arr.length}},{new:true})
        
           const supplier_trip = await Trip.findOneAndUpdate({'suppliers._id':supplier_id},
           {$set:{'suppliers.$':{name:supplier.name,_id:supplier_id,weight:new_supplier_weight.toFixed(2)}}},{new:true})
           if(!supplier_trip) res.status(400).json({"message":"failed to update supplier "})
        //    console.log(supplier_trip)
        
        //updating trip weight
    
        // const  = updatedSupplier.client_weight
        let new_trip_weight = 0;
        for (let i = 0; i < supplier_trip.suppliers.length; i++) {
            new_trip_weight += supplier_trip.suppliers[i].weight;
        }
        // console.log(new_trip_weight)
        // console.log(supplier_trip)
        const trip = await Trip.findByIdAndUpdate({_id:trip_id},{$set:{weight:new_trip_weight.toFixed(2)}},{new:true})
        // console.log(trip)
        if(!trip) return res.status(400).json({"message":"trip with id failed to update"})
    
        // sending response to the client
        const updateClient = await Client.findOneAndUpdate({_id:client_id},{$set:{name:req.body.name,weight:req.body.weight,
        description:req.body.description,number_pieces:req.body.number_pieces}},{new:true})
        if(!updateClient) next(errorHandler(402,"updating client failed"))
        res.status(200).json(updateClient)

    }catch(error){

        next(error)
    }


}

export const aggregatedClients = async(req,res,next)=>{

    try{

        // we use options:'i' method to remove search sensitivity

        const aggregated_clients = await Client.find(
            {
                "$or" : [
                    {
                      
                        createdAt: {$gt: req.params.key}
                
                    },

                ]
            }
        ) 
        // .sort({createdAt:-1})

        res.status(200).json(aggregated_clients)
        
    }catch(error){
        next(error)
    }

}

