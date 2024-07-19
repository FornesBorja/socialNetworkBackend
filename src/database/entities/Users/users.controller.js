import Users from "./users.model.js"

export const getAllUsers = async (req, res) =>{
    try {
        const users = await Users.find().select('-password');
    
        res.status(200).json(
          {
            success: true,
            message: "Users retrieved successfully",
            data: users
          }
        )
    
      } catch (error) {
        res.status(500).json(
          {
            success: false,
            message: "Error retrieving users",
            error: error.message
          }
        )
      }
}
export const getUserProfile = async (req, res) =>{
    try {
        console.log(userID);
        const userProfile = await Users.findOne({ _id: userID }).select('-password')
    
        res.status(200).json(
          {
            success: true,
            message: "User retrieved successfully",
            data: userProfile
          }
        )
    
      } catch (error) {
        res.status(500).json(
          {
            success: false,
            message: "Error retrieving user",
            error: error.message
          }
        )
      }
}