import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageView extends Document {
  path: string;
  userAgent: string;
  country: string;
  timestamp: Date;
}

const PageViewSchema = new Schema<IPageView>({
  path: String,
  userAgent: String,
  country: String,
  timestamp: { type: Date, default: Date.now, index: true }
});

export const PageView: Model<IPageView> = mongoose.models.PageView || mongoose.model<IPageView>('PageView', PageViewSchema);
