import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const supplierSchema = mongoose.Schema(
    
 {  
    trip_name:{

        type:String,
        required:true
    },
    trip_id:{

        type:String,
        required:true
    },
    weight:{

        type:Number,
        default:0

        },
    name:
    {

        type:String,
        required:true,
        
    },
    client_name:{

        type:[String],
        default:null
    },
    client_id:{

        type:[String],
        default:null
    },
    number_clients:{

        type:Number,
        default:0
    },
    issued_by:{

        type:String,
        required:true
    },

} , {timestamps:true}

);

const Supplier = mongoose.model('Supplier',supplierSchema)
export default Supplier