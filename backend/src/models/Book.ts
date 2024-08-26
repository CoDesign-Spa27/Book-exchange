import mongoose, { Schema, Document } from 'mongoose';

// Interface for the Book model
export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  owner: mongoose.Types.ObjectId;
}

// Mongoose schema for the Book model
const BookSchema: Schema<IBook> = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true, // Optional: automatically adds createdAt and updatedAt fields
});

// Export the model with the correct type
export default mongoose.model<IBook>('Book', BookSchema);
