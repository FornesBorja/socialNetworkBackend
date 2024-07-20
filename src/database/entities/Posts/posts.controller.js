import Posts from "./posts.model.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.tokenData.userId;
    const { title, content, multimedia } = req.body;

    const newPost = await Posts.create({
      title,
      content,  // Mapping description to content
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
