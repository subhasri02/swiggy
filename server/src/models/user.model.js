import { mongoose} from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true, 
        unique: true
    },
    password:{
        type: String,   
        required: true
    },  
    mobile:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin','delivery'],
        default: 'user'
    },
    resetOtp:{
        type: String,
    },
    isOtpVerified:{
        type: Boolean,
        default: false
    },
    otpExpires:{
        type:Date
    }
},
{timestamps: true});


const User = mongoose.model('User', userSchema);

export default User;


/* for setting otp we need to add 3 extra fields resetOtp, isOtpVerified and otpExpires*/