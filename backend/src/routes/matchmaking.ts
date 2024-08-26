import express from "express";
import { Request, Response } from "express";
import User from "../models/User"; // Assuming you have a User model
import Book from "../models/Book";

const router = express.Router();
router.get("/preference", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    // Find the user's books
    const user = await User.findById(userId).populate("books");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find books that match user's preferences
    const matchedBooks = await Book.find({
      owner: { $ne: userId }, // Exclude the user's own books
      genre: { $in: user.bookPreferences }, // Match on book title
    }).populate("owner");

    return res.json(matchedBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
