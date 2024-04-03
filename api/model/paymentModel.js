import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const paymentSchema = mongoose.Schema(
    
 {  
    reciept_number:{

        type:String,
        required:true,
        unique : true,
    },
    amount_dollars:{

        type:Number,
        required:true
    },
    kg_rate:{

        type:Number,
        required:true
    },
    dollar_rate:{

        type:Number,
        required:true
    },  
    total_amount:{

        type:Number,
        required:true
    },
    balance:{

        type:Number,
        required:true
    },
    client:{

        type:{}
    },
    issued_by:{

        type:String,
        required:true
    },


} , {timestamps:true}

);



const Payment = mongoose.model('Payment',paymentSchema)
export default Payment