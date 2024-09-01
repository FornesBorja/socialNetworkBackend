import { postsSeeder } from "./entities/Posts/posts.seeder.js";
import { usersSeeder } from "./entities/Users/users.seeder.js";
import { commentSeeder } from "./entities/Comments/comments.seeder.js";

(async () => {
    console.log("Starting seeders...");
    await usersSeeder();
    await postsSeeder();
    await commentSeeder();
 })();
 