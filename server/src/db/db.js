import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("DB Connection Success");
  } catch(err) {
     console.log("DB Connection error", err);
  }
};

export default dbConnect;
