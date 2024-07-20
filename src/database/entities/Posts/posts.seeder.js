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
  
    for (let i = 0; i < users.length; i++) {
      try {
        const userId = new mongoose.Types.ObjectId(users[i]._id); 
        const userPosts = insertedPosts
          .filter(post => post.author.equals(userId)) 
          .map(post => post._id);
        console.log('===========================');
        console.log(`Updating user ${users[i]._id} with posts:`, userPosts);
        console.log('===========================');

  
        await Users.findByIdAndUpdate(userId, { $set: { posts: userPosts } });
      } catch (err) {
        console.error(`Error updating user ${users[i]._id}:`, err);
      }
    }
  
    console.log("Users updated with posts");
  } catch (error) {
  } finally {
    dbDisconnection()
  }
};
