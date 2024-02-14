import express from 'express'
import { loginEmploye, registerEmployer } from '../contollers/userContoller.js'



const router = express.Router()

router.post('/registerUser' , registerEmployer)
router.post('/loginUser',loginEmploye)


export default router