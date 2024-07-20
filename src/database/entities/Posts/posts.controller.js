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
    const postId =req.params.id
    const postToDeleteValid = Types.ObjectId.isValid(postId)

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
        const userId= req.tokenData.id;
		const postIdToUpdate = req.params.id;
		const { title, description, multimedia } = req.body;
		const post = await Posts.findOne({
		  where: {
			id: postIdToUpdate,
		  },
		});
		if (!post) {
		  return res.status(404).json({
			success: false,
			message: 'Post not found',
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
		  updatedFields,
		);

        return res.status(200).json({
		  success: true,
		  message: 'Post updated successfully',
		  data: updatedFields,
		});
		
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Error updating post',
			error: error.message,
		});
	}
};