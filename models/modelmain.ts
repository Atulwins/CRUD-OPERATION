import { number, required, string } from 'joi';
import mongoose, { model } from 'mongoose';
import user from '../interface/user/user'
const schema = mongoose.Schema;

// interface User{
//     name:string;
//     age:number ;
//     process:string;

// }
const userSchema = new schema<user>({
   
    name: {
        type: String,
        required:true
    },
    age: {
        type: Number,
        required:true
    },
    process: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
   

})
const userModel= model('User',userSchema);
export default userModel;
