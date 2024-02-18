import express from 'express'
import { registerEmploye, loginEmploye, logoutEmploye } from '../contollers/authController.js'
import { verifyAdmin,} from '../verifyEmploye.js'




const route = express.Router()

route.post('/registerEmploye',verifyAdmin,registerEmploye)
route.post('/loginEmploye', loginEmploye)
route.get('/logoutEmploye',logoutEmploye)


export default route