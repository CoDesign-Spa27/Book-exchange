import mongoose, { Schema, Document } from 'mongoose';

interface IExchange extends Document {
  fromUser: mongoose.Types.ObjectId;
  toUser: mongoose.Types.ObjectId;
  bookOffered: mongoose.Types.ObjectId;
  bookRequested: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'rejected';
}

const ExchangeSchema: Schema = new Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookOffered: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  bookRequested: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
});

export default mongoose.model<IExchange>('Exchange', ExchangeSchema);
