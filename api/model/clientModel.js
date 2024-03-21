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
    supplier:{

        type:{},
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

    payments:{
        type:[

            {
                date:String,
                reciept_number:Number,
                kg_rate:Number,
                dollar_rate:Number,
                amount_ugx:Number,
                amount_dollar:Number,
                total_amount:Number,
                balance:Number

            }
        ],
        
    },

    deliveries:{
        type:[

            {

                date:String,
                weight:Number,
                delivered_by:Number,
                remaining_weight:Number
    
            }
        ],
        
    },



} , {timestamps:true}

);

const Client = mongoose.model('Client', clientSchema)
export default Client