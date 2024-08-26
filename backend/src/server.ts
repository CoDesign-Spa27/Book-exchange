import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';
import matchMaking from './routes/matchmaking'
import exchangeRoutes from './routes/exchangeRoutes';
import dotenv from 'dotenv';
import { protect } from './middlewares/authMiddlewares';


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api',protect,matchMaking)
app.use('/api', exchangeRoutes)


const PORT = process.env.PORT || 5000;
const MONGO_URL =process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error('MONGO_URL is not defined in the environment variables.');
  process.exit(1); // Exit the process if the MongoDB URI is missing
}

// Database connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process if the connection fails
  });
