import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICalculatorResult extends Document {
  calculatorSlug: string;
  inputHash: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  createdAt: Date;
}

const ResultSchema = new Schema<ICalculatorResult>({
  calculatorSlug: { type: String, index: true },
  inputHash: String,
  inputs: Object,
  outputs: Object,
  createdAt: { type: Date, default: Date.now, expires: 86400 } // TTL 24hr
});

export const CalculatorResult: Model<ICalculatorResult> = mongoose.models.CalculatorResult || mongoose.model<ICalculatorResult>('CalculatorResult', ResultSchema);
