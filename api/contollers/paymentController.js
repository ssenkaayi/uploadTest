
import asyncHandler from 'express-async-handler'
import Supplier from '../model/supplierModel.js';
import Client from '../model/clientModel.js';
import Payment from '../model/paymentModel.js';


export const createPayment = asyncHandler(async(req,res,next)=>{

    const clientExists = await Client.findById(req.params.id)
    if(!clientExists) return next(errorHandler(400,'client doesnt exist'))

    const arr = clientExists.payments
    let totalAmountPaid = 0

    for (let i = 0; i < arr.length; i++) {

        (totalAmountPaid) += (arr[i].amount_dollars )

    }


  
    const kg_rate = Number (req.body.kg_rate)
    const amount_dollars = Number(req.body.amount)
    const total_payment = (Number(clientExists.weight) * (req.body.kg_rate)).toFixed(2)
    const total_amount = (totalAmountPaid + amount_dollars).toFixed(2)
    const balance = (total_payment-total_amount ).toFixed(2)
    const amount_ugx = Number(req.body.dollar_rate) * Number(req.body.amount).toFixed(2)

    // parseFloat(number).toPrecision(12)
   
    
    const reciept_number = req.body.reciept_no
    const dollar_rate = Number(req.body.dollar_rate)

    
    const payment = await Payment.create({total_amount,balance,amount_dollars,amount_ugx,kg_rate,reciept_number,
    client:{_id:clientExists._id,name:clientExists.name},dollar_rate})

    console.log(payment)

    const date = payment.createdAt

    const addDelivery = await Client.findByIdAndUpdate({_id:req.params.id},{$push:{payments:{date,total_amount,balance,amount_dollars,amount_ugx,
    kg_rate,reciept_number,dollar_rate}}},{new:true})

    
    console.log(clientExists.weight)
    console.log(kg_rate)
    console.log(total_payment)

    res.status(200).send(addDelivery)
   
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