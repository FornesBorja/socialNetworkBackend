import Posts from "./posts.model.js"; 
import mongoose from "mongoose";
import { dbConnection, dbDisconnection } from "../../db.js";
import Users from "../Users/users.model.js";

export const postsSeeder = async () => {
  try {
    await dbConnection();
    await Posts.deleteMany({});
    const users = await Users.find({}, '_id'); 
    if (users.length === 0) {
      throw new Error("No users found to assign posts");
    }    const posts = [
      {
        title: "First Post",
        content: "This is the content of the first post",
        author: new mongoose.Types.ObjectId(users[0]._id), 
      },
      {
        title: "Second Post",
        content: "This is the content of the second post",
        author: new mongoose.Types.ObjectId(users[1]._id), 
      },
      {
        title: "Third Post",
        content: "This is the content of the third post",
        author: new mongoose.Types.ObjectId(users[0]._id), 
      },
      {
        title: "Fourth Post",
        content: "This is the content of the fourth post",
        author: new mongoose.Types.ObjectId(users[3]._id), 
      },
      {
        title: "Fifth Post",
        content: "This is the content of the fifth post",
        author: new mongoose.Types.ObjectId(users[0]._id), 
      },
    ];
  
    let insertedPosts;
    try {
      insertedPosts = await Posts.insertMany(posts);
      console.log('===========================');
      console.log("Posts seeded:", insertedPosts);
      console.log('===========================');

    } catch (err) {
      console.error('Error inserting posts:', err);
      mongoose.connection.close();
      return;
    }
  
  } catch (error) {
    console.log("Error in posts seeders", error);

  } finally {
    dbDisconnection()
  }
};
