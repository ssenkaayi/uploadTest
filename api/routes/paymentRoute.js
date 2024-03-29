import express from 'express'
import { createPayment,getPayments } from '../contollers/paymentController.js'


const route = express.Router()

route.post('/create/:id',createPayment)
route.get('/getPayments',getPayments)
// route.get('/getPayment/:id',getClient)
// route.delete('/delete/:id',deleteClient)

export default route