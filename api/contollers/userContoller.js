import { loginValidation,registerValidation  } from '../validation.js'
import Employe from '../model/employeModel.js';
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler'


export const registerEmployer = asyncHandler(async(req,res)=>{

    const {error} = registerValidation(req.body)
  
    if(error) return res.status(400).send(error.details[0].message)

    const {firstName, lastName,email,phone, role, password,address} = req.body

    const isEmploye = await Employe.findOne({email})
    console.log(email)
    if(isEmploye) return res.status(400).send('account with email exists')
  
    const hashedPassword = bcrypt.hashSync(password,10)
    // console.log(hashedPassword)
    
    const newEmploye = new Employe({
  
       firstName,
       lastName,
       email,
       phone,
       role,
       password:hashedPassword,
       address

    })


    const saveEmploye = await newEmploye.save()
    const {password:pass,...rest} = saveEmploye._doc
    res.status(200).send(rest)
   
  
})

const generateToken = (id)=>{

    return Jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1m'})
}

export const loginEmploye = asyncHandler(async(req,res,next)=>{

    const {error} = loginValidation(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const {email,password} = req.body

    // console.log(email,password)

    const isEmploye = await Employe.findOne({email})
    if(!isEmploye) return res.status(400).send('employe dosent exist')

    const isValidPassword = bcrypt.compareSync(password,isEmploye.password)
    if(!isValidPassword) return res.status(400).send('incorrect email and password')


    const token = generateToken(isEmploye._id)
    const {password:pass,...rest} = isEmploye._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).send(rest)

    
})

