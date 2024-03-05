
import express from 'express'
import { createClient , getClients ,deleteClient ,getClient,searchClient} from '../contollers/clientController.js'


const route = express.Router()

route.post('/create/:id',createClient)
route.get('/getClients',getClients)
route.get('/getClient/:id',getClient)
route.get('/searchClient/:key',searchClient)
route.delete('/delete/:id',deleteClient)

export default route