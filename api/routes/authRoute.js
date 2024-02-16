import express from 'express'
import { registerEmploye, loginEmploye, logoutEmploye } from '../contollers/authController.js'




const router = express.Router()

router.post('/registerEmploye' , registerEmploye)
router.post('/loginEmploye', loginEmploye)
router.get('/logoutEmploye',logoutEmploye)


export default router