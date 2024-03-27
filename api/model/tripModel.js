import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const tripSchema = mongoose.Schema(
    
 {  

    name:{

        type:String,
        required:true
    },

    transport:{

        type:Number,
        default:0,
        required:true
    },
      
    tax:{

        type:Number,
        required:true

    },

    trip_payment:{

        type:Number,
        default:0,
        required:true
    },

    market_fees:{

        type:Number,
        default:0

    },
    
    suppliers:[

        {
            name:{type:String,unique: true},
            weight:{type:Number,default:0},
            // number_clients:{type:Number,default:0},

        }
    ],

    number_suppliers:{

        type:Number,
        default:0
    },

    weight:{

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