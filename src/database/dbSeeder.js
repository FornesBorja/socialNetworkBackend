import { postsSeeder } from "./entities/Posts/posts.seeder.js";
import { usersSeeder } from "./entities/Users/users.seeder.js";

(async () => {
    console.log("Starting seeders...");
    await usersSeeder();
    await postsSeeder();
 })();
 