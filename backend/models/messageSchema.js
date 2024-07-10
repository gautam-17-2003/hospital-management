import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength: [3,"First name should contain at least 3 characters!"]
    },
    lastName:{
        type:String,
        required:true,
        minLength: [3,"Last name should contain at least 3 characters!"]
    },
    email:{
        type:String,
        required:true,
        validate : [validator.isEmail, "Please provide a valid Email!"]
    },
    phone:{
        type:String,
        required:true,
        minLength: [11,"phone number should contain at least 11 characters!"],
        maxLength: [11,"phone number should contain at max 11 characters!"]
    },
    message:{
        type:String,
        required:true,
        maxLength: [50, "Message should contain at max 50 characters!"]
    }
});


export const Message = mongoose.model("Message", messageSchema);


