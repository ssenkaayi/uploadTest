
import express from 'express'
import { createClient , getClients } from '../contollers/clientController.js'


const route = express.Router()

route.post('/create',createClient)
route.get('/getClients',getClients)

export default route