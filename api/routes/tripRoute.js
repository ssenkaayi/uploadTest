import express from 'express'
import { verifyAdmin,} from '../verifyEmploye.js'
import { createTrip } from '../contollers/tripController.js'




const route = express.Router()

route.post('/create',createTrip)



export default route