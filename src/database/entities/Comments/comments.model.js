import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "You must type something to publish it"],
    },
    likes: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    multimedia: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "You must specify the author of the comment"],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
      required: [true, "You must specify the posts where comment is"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Comments = model("Comments", CommentSchema);

export default Comments;
