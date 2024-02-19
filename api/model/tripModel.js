import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const tripSchema = mongoose.Schema(
    
 {  
    skyTeamName:{

        type:String,
        required:true
    },
    weight:{

        type:Number,
        required:true

        },
    supplierName:
    {

        type:String,
        required:true,
        
    },
  
    numberLuggages:{

        type:Number,
        required:true
    },
    issuedBy:{

        type:String,
        required:true
    },


} , {timestamps:true}

);

const Trip = mongoose.model('Trip',tripSchema)
export default Trip