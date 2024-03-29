import express from 'express'
import { createTrip, deleteTrip, getTrip, getTrips } from '../contollers/tripController.js'

const route = express.Router()

route.post('/create',createTrip)
route.get('/getTrips',getTrips)
route.get('/getTrip/:id',getTrip)
route.delete('/delete/:id',deleteTrip)

export default route