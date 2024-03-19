import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const tripSchema = mongoose.Schema(
    
 {  
    name:{

        type:String,
        required:true
    },
    weight:{

        type:Number,
        default:0

        },
 
    suppliers:[

        {
            name:String,
            weight:Number
        }
    ]   
    ,
    number_suppliers:{

        type:Number,
        default:0
    },
      
    transport:{

        type:Number,
        required:true
    },
      
    tax:{

        type:Number,
        required:true
    },
    trip_payment:{

        type:Number,
        required:true
    },
    market_fees:{

        type:Number,
        default:0
    },
    issued_by:{

        type:String,
        required:true
    },


} , {timestamps:true}

);

const Trip = mongoose.model('Trip',tripSchema)
export default Trip