import express from 'express'
import { loginEmploye, registerEmploye } from '../contollers/userContoller.js'



const router = express.Router()

router.post('/registerEmploye' , registerEmploye)
router.post('/loginEmploye',loginEmploye)


export default router