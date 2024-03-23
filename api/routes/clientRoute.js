
import express from 'express'
import { createClient , getClients ,deleteClient ,getClient,searchClient,updateClient, aggregatedClients} from '../contollers/clientController.js'


const route = express.Router()

route.post('/create/:id',createClient)
route.put('/updateClient/:id',updateClient)
route.get('/getClients',getClients)
route.get('/getClient/:id',getClient)
route.get('/searchClient/:key',searchClient)
route.get('/aggregatedClients/:date',aggregatedClients)
route.delete('/delete/:id',deleteClient)

export default route