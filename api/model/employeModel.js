import mongoose from "mongoose";
// import bcrypt from "bcryptjs"

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

// const hashPassword = async(next)=>{

//     if(!this.isModified('password')){
//         return next()
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password,salt)
//     this.password = hashedPassword;
// }


// userSchema.pre('save', async(next)=>{

  

//     if(!this.isModified("password")){
//         return next()
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password,salt);
//     this.password = hashedPassword
// }
// )



const Employe = mongoose.model('Employe',employeSchema)
export default Employe