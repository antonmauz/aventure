import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectDB = await mongoose.connect(
      process.env.MONGODB_URI ??
        "mongodb+srv://aventure:seba123@aventure.kxalqsz.mongodb.net/aventure-test?retryWrites=true&w=majority"
    );
    console.log(
      `Pinged your deployment. You successfully connected to MongoDB host ${connectDB.connection.host}`
    );
  } catch (error) {
    console.log("You haven't connected to MongoDB!");
    console.error(error);

    process.exit(1);
  }
};
