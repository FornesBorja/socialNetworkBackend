import mongoose from "mongoose";
import bcrypt from "bcrypt";
import fs from 'fs/promises';
import "dotenv/config";
import Users from "./users.model.js";
import { dbConnection, dbDisconnection } from "../../db.js";

export const usersSeeder = async () => {
  try {
    await dbConnection()
    await Users.deleteMany({});
    const users = [
        {
          email: "user1@example.com",
          password: await bcrypt.hash("password1", 10), // Encripta la contraseña
          is_active: true,
        },
        {
          email: "user2@example.com",
          password: await bcrypt.hash("password2", 10),
          is_active: true,
        },
        {
          email: "user3@example.com",
          password: await bcrypt.hash("password3", 10),
          is_active: true,
          role: "verified",
        },
        {
          email: "admin@admin.com",
          password: await bcrypt.hash("password4", 10),
          is_active: true,
          role: "super_admin",
        },
        {
          email: "user5@example.com",
          password: await bcrypt.hash("password5", 10),
          is_active: true,
          role: "user",
        },
      ];
    
      await Users.insertMany(users);
      console.log("Users seeded");
      
  } catch (error) {
    console.log('===========================');
        console.log('ERROR USERS SEEDER', error.message);
        console.log('===========================');
  } finally {
    await dbDisconnection();
}
}
