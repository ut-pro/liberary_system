import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/libSystem`);
    console.log("database connected sucessfully");
  } catch (error) {
    console.log("database not connected");
    console.error(error);
  }
};

export default connectDb;
