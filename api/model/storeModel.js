import mongoose from "mongoose";

const storeSchema = mongoose.Schema(
    
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

const Store = mongoose.model('Store',storeSchema)
export default Store