import { Schema, model } from "mongoose";

const PostsSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: [true, "You must type something to publish it"],
    },
    likes:[{
      type: Schema.Types.ObjectId,
      ref: "Users",
    }],
    author:{
      type: Schema.Types.ObjectId,
      ref: "Users",
      required:[true, "You must specify the author"],
    },
    multimedia: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

const Posts = model("Posts", PostsSchema);

export default Posts;
