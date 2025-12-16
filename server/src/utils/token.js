// for generating token using UserId as UserId is unique
import jwt from 'jsonwebtoken';
const genToken = async(userId)=>{
    try{
        const token = await jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
        return token;
    } catch(error){
        console.log("Error in generating token", error);
    }
}

export default genToken;