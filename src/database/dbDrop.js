import mongoose from "mongoose";
import "dotenv/config";
import { dbConnection, dbDisconnection } from "./db.js";

async function dropDatabase() {
  try {
    dbConnection()

    await mongoose.connection.db.dropDatabase();
    console.log('DB deleted successfully');

    dbDisconnection()
  } catch (err) {
    console.error("Can't delete DB", err);
    await mongoose.connection.close();
  }
}

dropDatabase();
