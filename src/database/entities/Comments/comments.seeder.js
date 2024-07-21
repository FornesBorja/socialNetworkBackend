import mongoose from "mongoose";
import { dbConnection, dbDisconnection } from "../../db.js";
import Comments from "./comments.model.js";
import Users from "../Users/users.model.js";
import Posts from "../Posts/posts.model.js";

export const commentSeeder = async () => {
  try {
    await dbConnection();
    await Comments.deleteMany({});

    const users = await Users.find({});
    if (users.length === 0) {
      throw new Error("No users found to assign comments");
    }
    const posts = await Posts.find({});
    if (posts.length === 0) {
      throw new Error("No users found to assign comments");
    }
    const comments = [
      {
        content: "This is the content of the first comment",
        post: new mongoose.Types.ObjectId(posts[0]._id),
        author: new mongoose.Types.ObjectId(users[0]._id),
      },
      {
        content: "This is the content of the second comment",
        post: new mongoose.Types.ObjectId(posts[2]._id),
        author: new mongoose.Types.ObjectId(users[1]._id),
      },
      {
        content: "This is the content of the third comment",
        post: new mongoose.Types.ObjectId(posts[3]._id),
        author: new mongoose.Types.ObjectId(users[0]._id),
      },
      {
        content: "This is the content of the fourth comment",
        post: new mongoose.Types.ObjectId(posts[0]._id),
        author: new mongoose.Types.ObjectId(users[3]._id),
      },
      {
        content: "This is the content of the fifth comment",
        post: new mongoose.Types.ObjectId(posts[1]._id),
        author: new mongoose.Types.ObjectId(users[0]._id),
      },
    ];

    const insertedComments = await Comments.insertMany(comments);

    console.log("===========================");
    console.log("Comments seeded:", insertedComments);
    console.log("===========================");

    
  } catch (error) {
    console.error("Error in comment Seeder:", error.message);
  } finally {
    await dbDisconnection();
  }
};
