
import Employe from '../model/employeModel.js';
import asyncHandler from 'express-async-handler';
import errorHandler from '../errorHandler.js';

export const getEmploye = asyncHandler(async(req,res)=>{


    const isEmploye = await Employe.findById(req.params.id)
    if(!isEmploye) return res.status(400).send('you are not authorise to view employe data')
  
    const {password:pass,...rest} = isEmploye._doc
    res.status(200).send(rest)
   
  
})

export const  deleteEmploye = async(req,res,next)=>{

    const listing = await Employe.findById(req.params.id)

    if(!listing) return next(errorHandler(401,'employe with id is not found'))

    // if(req.user.id!==listing.userRef) return next(errorHandler(401,'you can not authorized delete profile'))

    try{


        await Employe.findByIdAndDelete(req.params.id)

        res.status(200).json({"success":true})

    }catch(error){
        next(error)
    }

}

export const updateEmploye = async(req,res,next)=>{

    const exist = await Employe.findById(req.params.id)

    if(!exist) return next(errorHandler(401,'employe with id is not found'))

    // if(req.user.id!==exist.userRef) return next(errorHandler(401,'you can only update your own profile'))

    try{

        const updatedEmploye = await Employe.findByIdAndUpdate(req.params.id,req.body,{new:true}) 
        
        res.status(200).json(updatedEmploye)

    }catch(error){
        next(error)
    }
}


export const getEmployes = async(req,res,next)=>{


    if(req.params.id===req.user.id) {

        try{

            const userListings = await Listing.find({userRef:req.params.id})
            res.status(200).json(userListings)

        }catch(error){


            next(error)
        }

        
    }else{
        return next(errorHandler(401,'you can only view your own listing'))
    }
}