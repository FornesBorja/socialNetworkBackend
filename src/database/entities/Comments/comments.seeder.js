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

    for (let post of posts) {
      try {
        const postComments = insertedComments
          .filter((comment) => comment.post.equals(post._id))
          .map((comment) => comment._id);

        console.log("===========================");
        console.log(`Updating post ${post._id} with comments:`, postComments);
        console.log("===========================");

        await Posts.findByIdAndUpdate(post._id, {
          $set: { comment: postComments },
        });
      } catch (err) {
        console.error(`Error updating post ${post._id}:`, err);
      }
    }
    console.log("Posts updated with comments");
  } catch (error) {
    console.error("Error in commentSeeder:", error.message);
  } finally {
    await dbDisconnection();
  }
};
