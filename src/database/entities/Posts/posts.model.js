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
    likes:[{
      type: Schema.Types.ObjectId,
      ref: "Users",
    }],
    author:{
      type: Schema.Types.ObjectId,
      ref: "Users",
      required:[true, "You must specify the author"],
    },
    comment:[{
      type: Schema.Types.ObjectId,
      ref: "Comments",
    }],
    multimedia: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

const posts = model("Posts", PostSchema);

export default posts;
