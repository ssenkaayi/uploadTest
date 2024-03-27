import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const supplierSchema = mongoose.Schema(
    
 {  
    name:
    {

        type:String,
        required:true,
        
    },

    trip:{

        type:{name:{type:String,unique: true},}
    },

    clients:[

        {
            name:String,
            weight:{type:Number,default:0},
            
        }
    ],

    weight:{

        type:Number,
        default:0

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