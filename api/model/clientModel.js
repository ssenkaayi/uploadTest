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
                charge_rate:Number,
                charge_dollars:Number,
                charge_ugx:Number,
                dollar_rate:Number,

            }
        ],
        
    },

    deliveries:{
        type:[
            {

                date:String,
                weight:Number,
                delivered_by:String,
    

            }
        ],
        
    },



} , {timestamps:true}

);

const Client = mongoose.model('Client', clientSchema)
export default Client