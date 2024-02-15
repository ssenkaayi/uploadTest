import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    
 {  supplierName:{

        type:String,
        required:true
    },
    issuedBy:{

        type:String,
        required:true,
        unique : true,
        trim:true,
        
    },

} , {timestamps:true}

);

const Order = mongoose.model('Order',orderSchema)
export default Order