import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: string; // MDX content
  relatedCalculators: string[]; // slugs
  publishedAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
  slug: { type: String, unique: true, index: true },
  title: String,
  metaTitle: String,
  metaDescription: String,
  content: String,
  relatedCalculators: [String],
  publishedAt: Date,
  updatedAt: Date
});

export const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
