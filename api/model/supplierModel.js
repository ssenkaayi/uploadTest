import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const supplierSchema = mongoose.Schema(
    
 {  
    trip:{

        type:{},
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
    clients:{

        type:[{}],
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