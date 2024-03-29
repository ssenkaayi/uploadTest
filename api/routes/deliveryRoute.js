import express from 'express'
// import { createPayment } from '../contollers/paymentController.js'
import { createDelivery, getDeliveries, getDelivey } from '../contollers/deliveryController.js'


const route = express.Router()

route.post('/create/:id',createDelivery)
route.get('/getDelivery',getDeliveries)
route.get('/getDelivery/:id',getDelivey)
// route.delete('/delete/:id',deleteClient)

export default route