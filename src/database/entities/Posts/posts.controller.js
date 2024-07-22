import { Types } from "mongoose";
import Posts from "./posts.model.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    const { title, content, multimedia } = req.body;

    const newPost = await Posts.create({
      title,
      content,
      multimedia,
      author: userId,
    });

    return res.status(201).json({
      success: true,
      message: "New post created succesfully",
      data: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating the post",
      error: error.message,
    });
  }
};
export const deletePostByID = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    const postId = req.params.id;
    const postToDeleteValid = Types.ObjectId.isValid(postId);

    if (!postToDeleteValid) {
      return res.status(400).json({
        success: false,
        message: "Post ID not valid",
      });
    }

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await Posts.findByIdAndDelete(postId);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting the post",
      error: error.message,
    });
  }
};
export const updatePostById = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    const postIdToUpdate = req.params.id;
    const postToDeleteValid = Types.ObjectId.isValid(postIdToUpdate);
    const { title, description, multimedia } = req.body;

    if (!postToDeleteValid) {
      return res.status(400).json({
        success: false,
        message: "Post ID not valid",
      });
    }
    const post = await Posts.findOne({ _id: postIdToUpdate });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }
    const updatedFields = {
      title,
      description,
      multimedia,
    };
    await Posts.updateOne(
      {
        _id: postIdToUpdate,
      },
      updatedFields
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedFields,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating post",
      error: error.message,
    });
  }
};
export const getOwnPost = async (req, res) => {
  try {
    const userID = req.tokenData.id;
    const userPosts = await Posts.find({ author: userID }).select("-password");
    if (!userPosts) {
      throw new Error("Posts not found");
    }
    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: userPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving posts",
      error: error.message,
    });
  }
};
export const getAllPost = async (req, res) => {
  try {
    const userPosts = await Posts.find().select("-password");
    if (!userPosts) {
      throw new Error("Posts not found");
    }
    return res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: userPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving posts",
      error: error.message,
    });
  }
};
export const getPostByID = async (req, res) => {
  try {
    const postID = req.params.id;
    const idPost = await Posts.findById(postID).select("-password");
    console.log(idPost)
    if (!idPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: idPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error retrieving post",
      error: error.message,
    });
  }
};
export const getPostByUserID = async (req, res) => {
  try {
    const userID = req.params.userId;
    const idPost = await Posts.find({ author: userID }).select("-password");
    if (!idPost) {
      throw new Error("Posts not found");
    }
    return res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: idPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving post",
      error: error.message,
    });
  }
};
export const likeById = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.tokenData.id;

    const post = await Posts.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    const userIndex = post.likes.indexOf(userId);

    if (userIndex !== -1) {
      post.likes.splice(userIndex, 1);
      const updatedPost = await post.save();

      return res.status(200).json({
        success: true,
        message: "User disliked the post.",
        data: updatedPost,
      });
    } else {
      post.likes.push(userId);
      const updatedPost = await post.save();

      return res.status(200).json({
        success: true,
        message: "User liked the post.",
        data: updatedPost,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error processing like/dislike action.",
      error: error.message,
    });
  }
};
