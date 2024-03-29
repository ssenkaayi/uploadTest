import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

// const role = {
//     Admin :'Admin'
// }

const employeSchema = mongoose.Schema(
    
 {  firstName:{

        type:String,
        required:true
    },
    lastName:{

        type:String,
        required:true
        },
    email:{

        type:String,
        required:true,
        unique : true,
        
    },
    password:{

        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },

    photo:{
        type:String,
        default:'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/'
    },
    phone:{

        type:String,
    },
    address:{
        type:String,
        required:true
    }

} , {timestamps:true}

);



const Employe = mongoose.model('Employe',employeSchema)
export default Employe