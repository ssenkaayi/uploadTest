import mongoose from "mongoose";

const deliverySchema = mongoose.Schema(
    
 { 
     weight:{

        type:Number,
        required:true
    },
    balance:{

        type:Number,
        required:true
    },
    delivered:{

        type:Number,
        required:true
    },
    name:{

        type:String,
        required:true
    },
    number_pieces:{

        type:Number,
        required:true
    },
    issuedBy:{

        type:String,
        required:true,
    },

} , {timestamps:true}

);

const Delivery = mongoose.model('Delivery',deliverySchema)
export default Delivery