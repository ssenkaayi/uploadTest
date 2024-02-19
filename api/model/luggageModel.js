import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const luggageSchema = mongoose.Schema(
    
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
    clientName:{

        type:String,
        required:true
    },
    numberPackage:{

        type:Number,
        required:true
    },
    issuedBy:{

        type:String,
        required:true
    },


} , {timestamps:true}

);

const Luggage = mongoose.model('Luggage',luggageSchema)
export default Luggage