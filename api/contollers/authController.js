import {registerValidation} from '../validation.js'
import Employe from '../model/employeModel.js';
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler'
import errorHandler from '../errorHandler.js';



export const registerEmploye = asyncHandler(async(req,res,next)=>{

    const {error} = registerValidation(req.body)
  
    if(error) return next(errorHandler(400,error.details[0].message))
    // res.status(400).send(error.details[0].message)

    const {firstName, lastName,email,phone, role, password,address} = req.body

    const isEmploye = await Employe.findOne({email})
    
    if(isEmploye) return res.status(400).send({"message":'account with email exists'})
  
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

    return Jwt.sign({_id:id},process.env.JWT_SECRET,{
        // expiresIn: "6h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        expiresIn: "6h" // it will be expired after 120ms
        // expiresIn: "120s" // it will be expired after 120s
 })
}

export const loginEmploye = asyncHandler(async(req,res,next)=>{

    // const {error} = loginValidation(req.body)

    // if(!error) return next(errorHandler(400,error.details[0].message)) 

    const {email,password} = req.body

    // console.log(email,password)

    try{

        const isEmploye = await Employe.findOne({email})
        if(!isEmploye) return next(errorHandler(400,'employe dosent exist'))
    
        const isValidPassword = bcrypt.compareSync(password,isEmploye.password)
        if(!isValidPassword) return next(errorHandler(400,'incorrect email and password')) 
    
    
        const token = generateToken(isEmploye._id)
        const {password:pass,...rest} = isEmploye._doc
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)

      }catch(error){
        next(error)
    }
    

    
})

export const logoutEmploye = asyncHandler(async(req,res,next)=>{


    res.clearCookie('access_token').status(200).json("logged out succesfully")

    
})


