
import Jwt  from "jsonwebtoken";
import Employe from "./model/employeModel.js";
import asyncHandler from 'express-async-handler'


export const verifyToken = (req,res,next)=>{

    const token = req.cookies.access_token;
    console.log(token)

    if(!token) return next(errorHandler(401,'unauthorized'))

    Jwt.verify(token,process.env.JWT_SECRET,(error,user)=>{

        if(error) return next(errorHandler(403,'forbidden task'))
        req.user = user;
        next();
    });

}


export const verifyAdmin = asyncHandler(async(req,res,next)=>{

    const token = req.cookies.access_token
    // console.log(token)

    if(!token) return next(errorHandler(401,'unauthorized'))

    const user = Jwt.verify(token,process.env.JWT_SECRET);
    if(!user) return next(errorHandler(403,'forbidden task'))

    const userInfo = await Employe.findById(user._id).select("-password")
    // req.user.role == userInfo.role
    if(userInfo.role!=='admin') return res.status(400).send('Not an admin')
   
    req.user = user;
    // console.log(userInfo.role)

    next();
} )