import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICalculator extends Document {
  slug: string;
  title: string;
  category: string;
  usageCount: number;
  lastUsed: Date;
  createdAt: Date;
}

const CalculatorSchema = new Schema<ICalculator>({
  slug: { type: String, required: true, unique: true, index: true },
  title: String,
  category: String,
  usageCount: { type: Number, default: 0 },
  lastUsed: Date,
  createdAt: { type: Date, default: Date.now }
});

export const Calculator: Model<ICalculator> = mongoose.models.Calculator || mongoose.model<ICalculator>('Calculator', CalculatorSchema);
