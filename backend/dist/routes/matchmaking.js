"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User")); // Assuming you have a User model
const Book_1 = __importDefault(require("../models/Book"));
const router = express_1.default.Router();
router.get("/preference", async (req, res) => {
    try {
        const { userId } = req.query;
        // Find the user's books
        const user = await User_1.default.findById(userId).populate("books");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Find books that match user's preferences
        const matchedBooks = await Book_1.default.find({
            owner: { $ne: userId }, // Exclude the user's own books
            genre: { $in: user.bookPreferences }, // Match on book title
        }).populate("owner");
        return res.json(matchedBooks);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
