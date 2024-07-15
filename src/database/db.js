import mongoose from "mongoose";

export const dbConnection = () => {
    console.log('Start connection');
      return mongoose.connect(
      process.env.MONGO_URI,
      {}
    );
  };