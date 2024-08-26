import express from 'express';
import { createBook,deleteBook,getBook,getBooks, getUserBooks, updateBook } from '../controllers/bookController';
import { protect } from '../middlewares/authMiddlewares';

const router = express.Router();

router.post('/me/addBook',protect, createBook);
router.get('/books',protect, getBooks);
router.get('/me/books',protect, getUserBooks);
router.get('/me/book/:id',protect, getBook);
router.delete('/me/book/:id', protect, deleteBook);
router.put('/me/book/edit/:id',protect, updateBook)
export default router;
