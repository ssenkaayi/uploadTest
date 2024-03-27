import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

const clientSchema = mongoose.Schema(
    
 {  
    
    
    name:{

        type:String,
        required:true
    },

    weight:{

        type:Number,
        default:0,
        required:true

    },

    number_pieces:{

        type:Number,
        default:0,
        required:true,

    },

    description:{
        
        type:String,
        required:true
    },

    supplier:{

        trip_name:String, 
        supplier_name:String,
        
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
                kg_rate:{ type:Number,default:0},
                dollar_rate:{ type:Number,default:0},
                amount_ugx:{ type:Number,default:0},
                amount_dollars:{ type:Number,default:0},
                total_amount:{ type:Number,default:0},
                balance:{ type:Number,default:0}

            }
        ],
        
    },

    deliveries:{
        type:[

            {

                date:Date,
                weight_delivered:{ type:Number,default:0},
                pieces_delivered:{ type:Number,default:0},
                remaining_weight:{ type:Number,default:0},
                remaining_pieces:{ type:Number,default:0},
                delivered_by:String,
                // remaining_weight:Number
    
            }
        ],
        
    },

} , {timestamps:true}

);

const Client = mongoose.model('Client', clientSchema)
export default Client