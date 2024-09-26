import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    appointment_date:{
        type: Date,
        required: true,
    },
    department:{
        type:String,
        required: true,
    },
    doctor:{
        firstName:{
            type:String,
            required:true,
            minLength: [3,"First name should contain at least 3 characters!"]
        },
        lastName:{
            type:String,
            required:true,
            minLength: [3,"Last name should contain at least 3 characters!"]
        }
    },
    hasVisited:{
        type:Boolean,
        defalut: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        requied: true,
    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        requied: true,
    },
    address: {
        type:String,
        required: true,
    },
    status: {
        type: String,
        enum : ["Pending","Accepted","Rejected"],
        default: "Pending",
    }
});


export const Appointment = mongoose.model("Appointment", appointmentSchema);


