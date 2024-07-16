import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }],
    is_active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_adimn"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

export default User;
