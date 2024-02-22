import express from 'express'
import { createSupplier, getSupplier } from '../contollers/supplierController.js'

const route = express.Router()

route.post('/create',createSupplier)
route.get('/getSupplier',getSupplier)
// route.delete('/delete/:id',deleteLuggage)

export default route