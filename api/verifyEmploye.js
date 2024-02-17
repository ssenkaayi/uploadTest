import asyncHamdler from "express-async-handler"

import Employe from "./model/employeModel.js";
import Jwt  from "jsonwebtoken";


export const verifyToken = asyncHamdler(async(req, res ,next)=>{
   
    try{

        const token = req.cookies.token_access
        console.log(token)

        if(!token) return res.status(400).send('you are not authorized')

        const verified = Jwt.verify(token,process.env.JWT_SECRET)

        const user = await Employe.findById(verified.id).select("-password")
        console.log(user.role)
        next()

    }catch (error){

    }
})