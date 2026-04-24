import mongoose from "mongoose";

//connect to MongoDB
const connectDB = async () => {
  try{
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectDB;