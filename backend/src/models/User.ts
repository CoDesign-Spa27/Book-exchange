import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  books: mongoose.Types.ObjectId[];
  bookPreferences: string[]; // Array of preferred book titles
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  bookPreferences: { type: [String]},
});

export default mongoose.model<IUser>('User', UserSchema);
