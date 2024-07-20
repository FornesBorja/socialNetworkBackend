import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
      content: {
        type: String,
        required: [true, "You must type something to publish it"],
      },
      likes:{
        type: Schema.Types.ObjectId,
        ref: "Users",
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

const Comments = model("Comments", CommentSchema);

export default Comments;
