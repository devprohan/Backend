import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const ConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB HOST: ${ConnectionInstance.connection.host}` // here we gave an host name also
    );
  } catch (error) {
    console.log("Mongodb Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;
