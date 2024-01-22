import mongoose from "mongoose";
import { config } from "dotenv";
config();

const url = process.env.MONGO_URL;

const connectDB = async () => {
    try{
        await mongoose.connect(url);
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
};

export default connectDB;