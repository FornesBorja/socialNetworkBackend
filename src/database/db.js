import mongoose from "mongoose";
import "dotenv/config";

export const dbConnection = async () => {
  console.log('Start connection');
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connection established');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; 
  }
};
export const dbDisconnection = async () => {
  console.log('Start disconnection');
  try {
    await mongoose.disconnect();
    console.log('DB successfully disconnected');
  } catch (error) {
    console.error('Error trying to disconnect the DB:', error);
  }
};
