import express from 'express'
import { createPayment } from '../contollers/paymentController.js'


const route = express.Router()

route.post('/create/:id',createPayment)
// route.get('/getClients',getClients)
// route.get('/getClient/:id',getClient)
// route.delete('/delete/:id',deleteClient)

export default route