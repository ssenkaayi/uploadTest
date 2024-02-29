
import asyncHandler from 'express-async-handler'
import Supplier from '../model/supplierModel.js';
import Client from '../model/clientModel.js';


export const createPayment = asyncHandler(async(req,res,next)=>{

    const client = await Client.findById(req.body.client_id)
    if(!client) return res.status(400).send('client doesnt exist')
    console.log(client)

    const client_name = Client.name
    const client_weight = Client.weight
    const client_payment_status = client.total_payments


    res.status(200).send(client_name,client_weight,client_payment_status)
   
})


export const getPayments = async(req,res,next)=>{

    try{

        const client = await Payment.find()
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