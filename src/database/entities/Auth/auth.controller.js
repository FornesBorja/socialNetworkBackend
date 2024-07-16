import bcrypt from "bcrypt"
import User from "../Users/users.model.js"

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    if(!email || !password)
    {
        throw new Error ("email and password are required!")
    }

    const newUSer = await User.create({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User registered",
      data: newUSer,
    });
  } catch (error) {
    if(error==="email and password are required!")
    {
        res.status(402).json({
            success: false,
            message: error,
        })
    }
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};
