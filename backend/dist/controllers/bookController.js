"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBook = exports.getUserBooks = exports.updateBook = exports.deleteBook = exports.getBooks = exports.createBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const zod_1 = require("zod");
const User_1 = __importDefault(require("../models/User"));
const bookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    genre: zod_1.z.string().min(1, "Genre is required"),
});
const createBook = async (req, res) => {
    try {
        const bookData = bookSchema.parse(req.body);
        const existingBook = await Book_1.default.findOne({
            title: bookData.title,
            author: bookData.author,
            owner: req.user?.id,
        });
        if (existingBook) {
            return res
                .status(409)
                .json({ message: "You have already listed this book." });
        }
        const newBook = new Book_1.default({ ...bookData, owner: req.user?.id });
        const savedBook = await newBook.save();
        const user = await User_1.default.findById(req.user.id);
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
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({ errors: err.errors });
        }
        res.status(500).json({ message: err });
    }
};
exports.createBook = createBook;
const getBooks = async (req, res) => {
    try {
        const books = await Book_1.default.find().populate("owner", "username");
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({
            error: error,
        });
    }
};
exports.getBooks = getBooks;
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book_1.default.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "User not authorized" });
        }
        await book.deleteOne();
        res.status(200).json({ message: "Book removed" });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};
exports.deleteBook = deleteBook;
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const bookData = req.body;
        const bookSchema = zod_1.z.object({
            title: zod_1.z.string().optional(), // Optional fields for update
            author: zod_1.z.string().optional(),
            genre: zod_1.z.string().optional(),
        });
        const validatedData = bookSchema.parse(bookData);
        const book = await Book_1.default.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: "User not authorized" });
        }
        await Book_1.default.findByIdAndUpdate(id, validatedData, { new: true });
        res.status(200).json({ message: "Book updated successfully" });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({ errors: err.errors });
        }
        res.status(500).json({ message: err });
    }
};
exports.updateBook = updateBook;
const getUserBooks = async (req, res) => {
    try {
        const userId = req.user?.id; // Assuming `req.user.id` contains the authenticated user's ID
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const books = await Book_1.default.find({ owner: userId }).populate("owner", "username");
        if (!books || books.length === 0) {
            return res.status(404).json({ message: "No books found for this user" });
        }
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.getUserBooks = getUserBooks;
const getBook = async (req, res) => {
    try {
        const { id } = req.params; // Extract the book ID from the request parameters
        const book = await Book_1.default.findById(id).populate("owner", "username");
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
exports.getBook = getBook;
