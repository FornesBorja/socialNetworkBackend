import bcrypt from "bcrypt";
import "dotenv/config";
import Users from "./users.model.js";
import { dbConnection, dbDisconnection } from "../../db.js";

export const usersSeeder = async () => {
  try {
    await dbConnection()
    await Users.deleteMany({});
    const maxUser = await Users.findOne({}, 'index').sort({ index: -1 });
    const lastIndex = maxUser ? maxUser.index : 0;
    const users = [
        {
          index: lastIndex+1,
          email: "user1@example.com",
          password: await bcrypt.hash("password1", 10), // Encripta la contraseña
          is_active: true,
        },
        {
          index: lastIndex+2,
          email: "user2@example.com",
          password: await bcrypt.hash("password2", 10),
          is_active: true,
        },
        {
          index: lastIndex+3,
          email: "user3@example.com",
          password: await bcrypt.hash("password3", 10),
          is_active: true,
          role: "verified",
        },
        {
          index: lastIndex+4,
          email: "admin@admin.com",
          password: await bcrypt.hash("password4", 10),
          is_active: true,
          role: "super_admin",
        },
        {
          index: lastIndex+5,
          email: "user5@example.com",
          password: await bcrypt.hash("password5", 10),
          is_active: true,
          role: "user",
        },
      ];
    
      await Users.insertMany(users);
      console.log('===========================');
      console.log("Users seeded");
      console.log('===========================');

      
  } catch (error) {
    console.log('===========================');
        console.log('ERROR USERS SEEDER', error.message);
        console.log('===========================');
  } finally {
    await dbDisconnection();
}
}
