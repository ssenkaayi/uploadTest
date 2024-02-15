import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const paymentSchema = mongoose.Schema(
    
 {  recieptNo:{

        type:String,
        required:true
    },
    supplierName:{

        type:String,
        required:true
        },
    order_id:{

        type:String,
        required:true,
        unique : true,
        
        
    },
    issuedName:{

        type:String,
        required:true
    },


} , {timestamps:true}

);



const Payment = mongoose.model('Payment',paymentSchema)
export default Payment