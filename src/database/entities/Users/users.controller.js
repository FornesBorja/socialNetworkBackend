import Users from "./users.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error.message,
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const userID = req.tokenData.id;
    const userProfile = await Users.findOne({ _id: userID }).select(
      "-password"
    );
    if (!userProfile) {
      throw new Error("User not found");
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: userProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error.message,
    });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userID = req.tokenData.id;
    const { name, email, password } = req.body;
    let hashPassword;
    if (!name && !email && !password) {
      throw new Error("Need some information to update");
    }
    if (password) {
      hashPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
    }
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = hashPassword;
    const userUpdated = await Users.findOneAndUpdate(
      { _id: userID },
      updateFields,
      { new: true } 
  ).select('-password'); 
    if (!userUpdated) {
      return res.status(404).json({
        success: false,
        message: "User not found or no changes detected",
      });
    }
    return res.status(200).json({
      success: true,
      Message: "User profile updated",
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

export const followById = async (req, res) => {
  const { userId } = req.params;
  const { id } = req.tokenData; 

  try {
    const targetUser = await Users.findById(userId);
    if (!targetUser) return res.status(404).json({ message: 'Target user not found' });

    const currentUser = await Users.findById(id);
    if (!currentUser) return res.status(404).json({ message: 'Current user not found' });

    if (targetUser.followers.includes(id)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    targetUser.followers.push(id);
    await targetUser.save();

    res.status(200).json({ message: 'Followed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};