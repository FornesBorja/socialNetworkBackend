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