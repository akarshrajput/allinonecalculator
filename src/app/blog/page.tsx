import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AdUnit from '@/components/ui/AdUnit';
import connectToDatabase from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';

export const metadata: Metadata = {
  title: 'Blog — Guides & Tips | CalculatorHub',
  description: 'Read our latest guides, tips, and tutorials on finance, health, and mathematics.',
  alternates: {
    canonical: 'https://www.allinonecalculator.fun/blog'
  }
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogIndexPage() {
  let posts: any[] = [];
  try {
    await connectToDatabase();
    posts = await BlogPost.find({ publishedAt: { $lte: new Date() } })
      .sort({ publishedAt: -1 })
      .limit(20)
      .lean();
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  return (
    <article className="max-w-5xl mx-auto space-y-12">
      <header className="space-y-4 border-b border-border pb-8">
        <Breadcrumb items={[
          { label: 'Blog', href: '/blog' }
        ]} />
        <h1 className="text-4xl font-display font-bold text-text-primary">Our Blog</h1>
        <p className="text-xl text-text-muted">Guides, tips, and deeper explanations to help you understand your calculations.</p>
      </header>

      <AdUnit slot="blog_index_top" format="auto" />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-accent hover:shadow-md transition-all">
                <time className="text-sm text-text-muted mb-2 block">
                  {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h2 className="text-xl font-bold font-display text-text-primary group-hover:text-accent mb-3">
                  {post.title}
                </h2>
                <p className="text-text-muted line-clamp-3">
                  {post.metaDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl bg-surface">
          <p className="text-text-muted">No blog posts found. Check back later!</p>
        </div>
      )}
    </article>
  );
}
