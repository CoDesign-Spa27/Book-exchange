import express from 'express';
import { acceptExchangeRequest, createExchangeRequest, getExchangeRequests, rejectExchangeRequest } from '../controllers/exchangeController';
import { protect } from '../middlewares/authMiddlewares';

const router = express.Router();

router.post('/exchange', protect, createExchangeRequest);
router.get('/exchange', protect, getExchangeRequests);

router.put('/exchange/accept/:id', protect, acceptExchangeRequest);
router.put('/exchange/reject/:id', protect, rejectExchangeRequest);

export default router;
