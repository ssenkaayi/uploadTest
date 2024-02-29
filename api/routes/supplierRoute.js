import express from 'express'
import { createSupplier, deleteSupplier, getSuppliers } from '../contollers/supplierController.js'

const route = express.Router()

route.post('/create',createSupplier)
route.get('/getSupplier',getSuppliers)
route.delete('/delete/:id',deleteSupplier)
// route.delete('/delete/:id',deleteLuggage)

export default route