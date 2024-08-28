import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import createHttpError from "http-errors";
import uploadToCloudinary from "../utils/cloudinary"; 
import path from "path";

const userRegisteration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password} = req.body;

  if (!firstName || !lastName || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }
  const avatar = req.file?.path;

  try {
    let avatarUrl = "";

    if (avatar) {
      const cloudinaryResult = await uploadToCloudinary(avatar);
      avatarUrl = cloudinaryResult?.secure_url || ""; 
    }
    const userDoc = new User({
      firstName,
      lastName,
      email,
      password,
      avatar:avatarUrl,
    });

    await userDoc.save();
    const token = userDoc.generateAccessToken();

    res.status(201).json({ user: userDoc, token });
  } catch (error) {
    if (error instanceof Error) {
      if ((error as any).code === 11000) {
        const err = createHttpError(400, "Email already exists");
        return next(err);
      }
      console.log(error.message);
      res.status(400).json({ message: error.message });
    } else {
      console.log("Unknown error occurred:", error);
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordValid = await user.checkPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = user.generateAccessToken();

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { userRegisteration, userLogin };