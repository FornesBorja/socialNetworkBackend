import mongoose from "mongoose";
import "dotenv/config";

const dbUri = process.env.MONGO_URI; 
async function dropDatabase() {
  try {
    await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connecting to DB');

    await mongoose.connection.db.dropDatabase();
    console.log('DB deleted successfully');

    await mongoose.connection.close();
    console.log('Conection closed');
  } catch (err) {
    console.error("Can't delete DB", err);
    await mongoose.connection.close();
  }
}

dropDatabase();
