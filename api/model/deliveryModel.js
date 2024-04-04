import mongoose, { isValidObjectId } from "mongoose";

const deliverySchema = mongoose.Schema(
    
 { 
     weight_delivered:{

        type:Number,
        required:true
    },
    remaining_weight:{

        type:Number,
        required:true
    },
    delivered_by:{

        type:String,
        required:true
    },
    client:{

       type:{}
    },
    pieces_delivered:{

        type:Number,
        // 
    },
    remaining_pieces:{

        type:Number,
        required:true,
    },
    issued_by:{

        type:String,
        required:true
    },

} , {timestamps:true}

);

const Delivery = mongoose.model('Delivery',deliverySchema)
export default Delivery