import { Schema, model } from "mongoose";

const postSchema = new Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;