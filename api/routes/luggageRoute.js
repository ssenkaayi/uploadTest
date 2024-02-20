import express from 'express'
import { createLuggage, deleteLuggage, getLuggages } from '../contollers/luggageController.js'

const route = express.Router()

route.post('/create',createLuggage)
route.get('/getLuggages',getLuggages)
route.delete('/delete/:id',deleteLuggage)

export default route