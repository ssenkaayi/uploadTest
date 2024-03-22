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
                date:Date,
                reciept_number:String,
                kg_rate:Number,
                dollar_rate:Number,
                amount_ugx:Number,
                amount_dollars:Number,
                total_amount:Number,
                balance:Number

            }
        ],
        
    },

    deliveries:{
        type:[

            {

                date:Date,
                weight_delivered:Number,
                pieces_delivered:Number,
                remaining_weight:Number,
                remaining_pieces:Number,
                delivered_by:String,
                // remaining_weight:Number
    
            }
        ],
        
    },



} , {timestamps:true}

);

const Client = mongoose.model('Client', clientSchema)
export default Client