import mongoose, { mongo } from "mongoose";

export const dbconnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    }).then(() => {
        console.log("connected to Db");
    }).catch(err => {
        console.log(`Some error occured ${err}`);
    });
}