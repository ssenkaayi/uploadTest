import express from 'express'
import { createLuggage, getLuggages } from '../contollers/luggageController.js'

const route = express.Router()

route.post('/create',createLuggage)
route.get('/getLuggages',getLuggages)

export default route