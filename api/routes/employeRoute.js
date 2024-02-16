
import express from 'express'
import { getEmploye, deleteEmploye, updateEmploye, getEmployes } from '../contollers/employeContoller.js'

const router = express.Router()

router.get('/getEmploye/:id',getEmploye)
router.delete('/deleteEmploye/:id',deleteEmploye)
router.put('/updateEmploye/:id',updateEmploye)
router.get('/getEmployes',getEmployes)



export default router