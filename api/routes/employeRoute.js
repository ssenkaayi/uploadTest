
import express from 'express'
import { getEmploye, deleteEmploye, updateEmploye, getEmployes } from '../contollers/employeContoller.js'

const route = express.Router()

route.get('/getEmploye/:id',getEmploye)
route.delete('/deleteEmploye/:id',deleteEmploye)
route.put('/updateEmploye/:id',updateEmploye)
route.get('/getEmployes',getEmployes)



export default route