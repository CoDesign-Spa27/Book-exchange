import { Request, Response } from "express";
import Book from "../models/Book";
import { z } from "zod";
import User from "../models/User";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
});
export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = bookSchema.parse(req.body);

    const existingBook = await Book.findOne({
      title: bookData.title,
      author: bookData.author,
      owner: req.user?.id,
    });

    if (existingBook) {
      return res
        .status(409)
        .json({ message: "You have already listed this book." });
    }

    const newBook = new Book({ ...bookData, owner: req.user?.id });
    const savedBook = await newBook.save();

    const user = await User.findById(req.user.id);
    if (user) {
      user.books.push(savedBook.id);
      await user.save();
    }

    res.status(201).json({
      id: savedBook._id, // Accessing the ObjectId
      title: savedBook.title,
      author: savedBook.author,
      genre: savedBook.genre,
      owner: savedBook.owner, // Include the owner if needed
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle Zod validation errors
      return res.status(400).json({ errors: err.errors });
    }

    res.status(500).json({ message: err });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate("owner", "username");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    await book.deleteOne();
    res.status(200).json({ message: "Book removed" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookData = req.body;

    const bookSchema = z.object({
      title: z.string().optional(), // Optional fields for update
      author: z.string().optional(),
      genre: z.string().optional(),
    });

    const validatedData = bookSchema.parse(bookData);
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }
    await Book.findByIdAndUpdate(id, validatedData, { new: true });

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Handle Zod validation errors
      return res.status(400).json({ errors: err.errors });
    }

    res.status(500).json({ message: err });
  }
};

export const getUserBooks = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // Assuming `req.user.id` contains the authenticated user's ID

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const books = await Book.find({ owner: userId }).populate(
      "owner",
      "username"
    );

    if (!books || books.length === 0) {
      return res.status(404).json({ message: "No books found for this user" });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract the book ID from the request parameters

    const book = await Book.findById(id).populate("owner", "username");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
