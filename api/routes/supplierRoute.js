import express from 'express'
import { createSupplier, deleteSupplier, getSuppliers, getSupplier,} from '../contollers/supplierController.js'

const route = express.Router()

route.post('/create/:id',createSupplier)
route.get('/getSupplier',getSuppliers)
route.get('/getSupplier/:id',getSupplier)
route.delete('/delete/:id',deleteSupplier)
// route.delete('/delete/:id',deleteLuggage)

export default route