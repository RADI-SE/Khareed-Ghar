import mongoose from "mongoose";
 
export const connect = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
     } catch (error) {
         process.exit(1);
    }
};