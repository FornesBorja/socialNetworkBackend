import bcrypt from "bcrypt";
import User from "../Users/users.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    if (!email || !password) {
      throw new Error("email and password are required!");
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
    if (error.name === "Please enter a valid email address") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a valid email address",
          error: error.message,
        });
    }
    if (error.name === "Email and password are required!") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email and password are required!",
          error: error.message,
        });
    }

    if (error.code === 11000) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email already registered",
          error: error.message,
        });
    }

    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user or password invalid",
      });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "user or password invalid",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.EXPIRE_DATE,
      }
    );

    res.status(200).json({
      success: true,
      message: "user Logged",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error loging user",
      error: error.message,
    });
  }
};
