
import asyncHandler from 'express-async-handler'
import Supplier from '../model/supplierModel.js';
import Client from '../model/clientModel.js';
import Delivery from '../model/deliveryModel.js';
// import { error } from '@hapi/joi/lib/annotate.js';
import errorHandler from '../errorHandler.js';


export const createDelivery = asyncHandler(async(req,res,next)=>{

    const clientExists = await Client.findById(req.params.id)
    if(!clientExists) return next(errorHandler(400,'client doesnt exist'))

    // console.log(clientExists)
    // console.log(req.body.weight_delivered)
    // console.log(req.body.pecies_delivered)

    const arr = clientExists.deliveries
    let totalWeightDelivered = 0
    let totalPiecesDelivered = 0

    for (let i = 0; i < arr.length; i++) {

        totalWeightDelivered += (arr[i].weight_delivered )
        totalPiecesDelivered += (arr[i].pieces_delivered )

    }

    console.log(totalPiecesDelivered)
    console.log(totalWeightDelivered)


    const remaining_weight = clientExists.weight - (totalWeightDelivered + Number(req.body.weight_delivered))
    const remaining_pieces = clientExists.number_pieces - (totalPiecesDelivered + Number(req.body.pecies_delivered))
    const pieces_delivered = req.body.pecies_delivered
    const weight_delivered = req.body.weight_delivered
    const delivered_by = req.body.delivered_by

    // console.log(clientExists.weight)
    // console.log(clientExists.number_pieces)
    
    const delivery = await Delivery.create({remaining_weight,remaining_pieces,pieces_delivered,weight_delivered,delivered_by,
    client:{_id:clientExists._id,name:clientExists.name},})

    const date = delivery.createdAt

    const addDelivery = await Client.findByIdAndUpdate({_id:req.params.id},{$push:{deliveries:{date,remaining_weight,remaining_pieces,pieces_delivered,
    weight_delivered,delivered_by}}},{new:true})




    // console.log(addDelivery)

    res.status(200).send(delivery)
   
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


    const delivery = await Delivery.findById(req.params.id)
    if(!delivery) return res.status(400).send('client not found')

    try{
        // console.log(client)
        const _id = delivery._id
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