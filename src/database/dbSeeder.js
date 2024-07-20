import { usersSeeder } from "./entities/Users/users.seeder.js";

(async () => {
    console.log("Starting seeders...");
    await usersSeeder();
    
 })();
 