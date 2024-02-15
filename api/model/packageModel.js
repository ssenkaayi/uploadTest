import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const paymentSchema = mongoose.Schema(
    
 {  luggage_id:{

        type:String,
        required:true
    },
    weight:{

        type:Number,
        required:true
        },
    pieces:{

        type:Number,
        required:true,

    },
    clientName:{

        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    issuedName:{
        type:String,
        required:true
    },

} , {timestamps:true}

);

const Payment = mongoose.model('Payment',paymentSchema)
export default Payment