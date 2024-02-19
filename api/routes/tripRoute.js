import express from 'express'
import { verifyAdmin,} from '../verifyEmploye.js'
import { createTrip, getTrips } from '../contollers/tripController.js'




const route = express.Router()

route.post('/create',createTrip)
route.get('/getTrips',getTrips)



export default route