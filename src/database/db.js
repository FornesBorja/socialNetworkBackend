import mongoose from "mongoose";

export const dbConnection = () => {
    console.log('Start connection');
      return mongoose.connect(
      process.env.MONGO_URI,
      {}
    );
  };

  export const dbDisconnection = async () => {
    console.log('Start disconnection');
    try {
        await mongoose.disconnect();
        console.log('DB successfully disconnected');
    } catch (error) {
        console.error('Error trying to disconnect the DB: ', error);
    }
};