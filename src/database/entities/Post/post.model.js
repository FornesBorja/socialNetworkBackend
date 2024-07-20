import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: [true, "You must type something to publish it"],
    },
    multimedia: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const posts = model("Posts", PostSchema);

export default posts;
