import mongoose from "mongoose";
import "dotenv/config";
import { dbConnection, dbDisconnection } from "./db.js";

(async () => {
  try {
    await dbConnection();
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Te connection is NOT active');
    }
    const db = mongoose.connection.getClient().db();
    if (!db) {
      throw new Error("Can't reach DB");
    }
    const collections = await db.listCollections().toArray();
    console.log('Collections of DB:', collections.map(c => c.name));

    for (const collection of collections) {
      const collectionName = collection.name;
      if (collectionName !== 'system.indexes') {
        await db.dropCollection(collectionName);
        console.log(`Collections ${collectionName} deleted succesfully`);
      }
    }

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await dbDisconnection();
  }
})();
