
import express from 'express'
import { createClient , getClients ,deleteClient } from '../contollers/clientController.js'


const route = express.Router()

route.post('/create',createClient)
route.get('/getClients',getClients)
route.delete('/delete/:id',deleteClient)

export default route