
import asyncHandler from 'express-async-handler'
import Supplier from '../model/supplierModel.js';
import Client from '../model/clientModel.js';
import Delivery from '../model/deliveryModel.js';
// import { error } from '@hapi/joi/lib/annotate.js';
import errorHandler from '../errorHandler.js';


export const createDelivery = asyncHandler(async(req,res,next)=>{

    // console.log(req.body)

    const clientExists = await Client.findById(req.params.id)
    if(!clientExists) return next(errorHandler(400,'client doesnt exist'))

    const arr = clientExists.deliveries
    let totalWeightDelivered = 0
    let totalPiecesDelivered = 0

    for (let i = 0; i < arr.length; i++) {

        totalWeightDelivered += (arr[i].weight_delivered )
        totalPiecesDelivered += (arr[i].pieces_delivered )

    }
    const available_weight = (clientExists.weight - (totalWeightDelivered)).toFixed(2)
    const available_number_pieces = (clientExists.number_pieces - (totalPiecesDelivered)).toFixed(2)

    console.log(available_weight)
    console.log(req.body.weight_delivered)
    console.log(100<50)

    // if(available_weight < req.body.weight_delivered) return next(errorHandler(400,`weight to be delivered cannot execeed ${available_weight}`))
    // if(available_number_pieces < req.body.pecies_delivered) return next(errorHandler(400,`number of pieces to be delivered cannot execeed ${available_number_pieces}`))
    

    const remaining_weight = Number(clientExists.weight - (totalWeightDelivered + Number(req.body.weight_delivered))).toFixed(2)
    const remaining_pieces = Number(clientExists.number_pieces - (totalPiecesDelivered + Number(req.body.pecies_delivered))).toFixed(2)
    const pieces_delivered = req.body.pecies_delivered
    const weight_delivered = req.body.weight_delivered
    const delivered_by = req.body.delivered_by
    const issued_by = req.body.issued_by

    if(remaining_pieces == 0 && remaining_weight > 0) return next(errorHandler(400,`weight of ${remaining_weight}kg cannot exisist with zero number of pieces`))
    if(remaining_weight == 0 && remaining_pieces > 0) return next(errorHandler(400,`number of amount ${remaining_pieces} cannot exisist with zero weight`))
    
    const delivery = await Delivery.create({remaining_weight,remaining_pieces,pieces_delivered,weight_delivered,delivered_by, issued_by,
    client:{_id:clientExists._id,name:clientExists.name},})

    const date = delivery.createdAt

    const addDelivery = await Client.findByIdAndUpdate({_id:req.params.id},{$push:{deliveries:{date,remaining_weight,remaining_pieces,pieces_delivered,
    weight_delivered,delivered_by,_id:delivery._id}}},{new:true})

    // const updateClintRemaaingweight = await Client.findByIdAndUpdate({_id:req.params.id},{$set:remaining_weight},{new:true})

    res.status(200).send(delivery)
   
})

export const getDeliveries = async(req,res,next)=>{

    try{

        const deliveries = await Delivery.find().sort({createdAt:-1}).limit(24)
        if(deliveries===undefined) return res.status(400).send('no packages for clients')

        const page  = parseInt (req.query.page)
        const limit = parseInt (req.query.limit)

        const startIndex = (page - 1) * limit
        const lastIndex  = (page) * limit

        const results = {}
        results.totalDeliveries = deliveries.length
        results.pageCount = Math.ceil(deliveries.length/limit)

        if(lastIndex < deliveries.length){
            results.next = {
                page: page + 1

            }
        }

        if(startIndex > 0){
            results.prev = {
                page: page - 1
                
            }
        }
        
        results.result = deliveries.slice(startIndex,lastIndex)

        res.status(200).json(results)

    }catch(error){


        next(error)
    }

}

export const getDelivey = asyncHandler(async(req,res)=>{


    const delivery_exists = await Delivery.findById(req.params.id)
    if(!delivery_exists) return res.status(400).send('you are not authorise to view client data')
  
    // const {password:pass,...rest} = isEmploye._doc
    res.status(200).send(delivery_exists)
   
})


export const  deleteClient = async(req,res,next)=>{


    const delivery = await Delivery.findById(req.params.id)
    if(!delivery) return res.status(400).send('client not found')

    try{
        // console.log(client)
        const _id = delivery._id
        // const supplier_id = client.supplier_id
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