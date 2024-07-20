import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    index: {
      type: Number,
      required: [true, "Index is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "verified", "super_admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey:false
  }
);

const Users = model("Users", UserSchema);

export default Users;
