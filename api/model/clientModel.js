import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const clientSchema = mongoose.Schema(
    
 {  
    weight:{

        type:Number,
        required:true

        },
    number_pieces:{

        type:Number,
        required:true,

    },
    name:{

        type:String,
        required:true
    },
    supplier_name:{

        type:String,
        required:true
    },
    supplier_id:{

        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    total_payments:{

        type:Number,
        default:0
    },
    store_status:{

        type:Number,
        default:0
    },

    issued_by:{
        type:String,
        required:true
    },

} , {timestamps:true}

);

const Client = mongoose.model('Client', clientSchema)
export default Client