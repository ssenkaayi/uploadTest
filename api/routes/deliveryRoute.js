import express from 'express'
// import { createPayment } from '../contollers/paymentController.js'
import { createDelivery } from '../contollers/deliveryController.js'


const route = express.Router()

route.post('/create',createDelivery)
// route.get('/getDelivey',getClients)
// route.get('/getClient/:id',getClient)
// route.delete('/delete/:id',deleteClient)

export default route