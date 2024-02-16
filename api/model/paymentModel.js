import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const paymentSchema = mongoose.Schema(
    
 {  recieptNo:{

        type:String,
        required:true,
        unique : true,
    },
    amount:{

        type:Number,
        required:true
        },
    total:{

        type:Number,
        required:true
        }, 
    status:{

        type:String,
        required:true
        },
    supplierName:{

        type:String,
        required:true
        },
    clientName:{

        type:String,
        required:true
        },    
    weight:{

        type:Number,
        required:true,
    },
    issuedName:{

        type:String,
        required:true
    },


} , {timestamps:true}

);



const Payment = mongoose.model('Payment',paymentSchema)
export default Payment