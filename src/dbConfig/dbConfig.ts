import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " +
          error
      );
      process.exit(1);
    });
  } catch (error: any) {
    console.log("Error while connecting to database: ");
    console.log(error);
  }
};
