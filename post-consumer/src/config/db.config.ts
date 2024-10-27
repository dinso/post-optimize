import mongoose, { mongo } from "mongoose";

export const connectDb  = async () => {
    await mongoose.connect("mongodb://localhost:27017/eda-test").then(() => {
        console.log("Connected to Database!");
    }).catch((error) => {
        console.error("Error connecting Database: ", error)
    })
}