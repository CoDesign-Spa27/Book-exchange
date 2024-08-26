"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = express_1.default.Router();
router.post('/me/addBook', authMiddlewares_1.protect, bookController_1.createBook);
router.get('/books', authMiddlewares_1.protect, bookController_1.getBooks);
router.get('/me/books', authMiddlewares_1.protect, bookController_1.getUserBooks);
router.get('/me/book/:id', authMiddlewares_1.protect, bookController_1.getBook);
router.delete('/me/book/:id', authMiddlewares_1.protect, bookController_1.deleteBook);
router.put('/me/book/edit/:id', authMiddlewares_1.protect, bookController_1.updateBook);
exports.default = router;
