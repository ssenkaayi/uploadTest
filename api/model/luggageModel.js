import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const luggageSchema = mongoose.Schema(
    
 {  tripName:{

        type:String,
        required:true
    },
    totalKgs:{

        type:String,
        required:true
        },
    supplierName:{

        type:String,
        required:true,
        unique : true,
       
        
    },
    clientName:{

        type:String,
        required:true
    },
    numberPackage:{
        type:String,
        required:true
    },


} , {timestamps:true}

);

const Luggage = mongoose.model('Luggage',luggageSchema)
export default Luggage