
import express from 'express'
import { createClient , getClients ,deleteClient ,getClient} from '../contollers/clientController.js'


const route = express.Router()

route.post('/create',createClient)
route.get('/getClients',getClients)
route.get('/getClient/:id',getClient)
route.delete('/delete/:id',deleteClient)

export default route