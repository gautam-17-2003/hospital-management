import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    nic:{
        type:String,
        required:true,
        minLength: [13,"nic should contain at least 13 characters!"],
        maxLength: [13,"nic should contain at max 13 characters!"]
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum:["Male","Female"]
    },
    password: {
        type: String,
        minLength: [8, "password must contain at least 8 characters"],
        required: true,
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin","Patient","Doctor"]
    },
    docDept: {
        type:String
    },
    docAvtar: {
        public_id: String,
        url: String
    }
});


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebTokens = function (){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    })
};



export const User = mongoose.model("User", userSchema)