import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { z } from "zod";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userSchema = z.object({
      username: z
        .string()
        .min(4, { message: "Username must be at least 4 characters long" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" }),
      bookPreferences: z.array(z.string()).optional(),
    });

    const userData = userSchema.parse(req.body);

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      ...userData,
      password: hashedPassword,
      bookPreferences: userData.bookPreferences || [],
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully", newUser });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ errors: err.errors });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });
    const loginData = loginSchema.parse(req.body);
    const user = await User.findOne({ email: loginData.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "secret", {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

 
export const getMe = async (req: Request, res: Response) => {
  try {
   
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};