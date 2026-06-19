import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AdUnit from '@/components/ui/AdUnit';
import connectToDatabase from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';
import { getCalculatorData } from '@/lib/calculatorData';
import StructuredData from '@/components/seo/StructuredData';

export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  try {
    await connectToDatabase();
    const posts = await BlogPost.find({}).select('slug').lean();
    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (err) {
    console.error('Failed to generate static params for blog posts:', err);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug: params.slug }).lean();
  
  if (!post) return {};
  
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `https://www.allinonecalculator.fun/blog/${post.slug}`
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      url: `https://www.allinonecalculator.fun/blog/${post.slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  await connectToDatabase();
  const post = await BlogPost.findOne({ slug: params.slug }).lean();

  if (!post) notFound();

  const relatedCalcs = (post.relatedCalculators || []).map(slug => getCalculatorData(slug)).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.publishedAt?.toISOString(),
    "dateModified": post.updatedAt?.toISOString(),
    "author": {
      "@type": "Organization",
      "name": "CalculatorHub"
    }
  };

  return (
    <article className="max-w-4xl mx-auto space-y-12">
      <StructuredData data={articleSchema} />
      
      <header className="space-y-6 pb-8 border-b border-border">
        <Breadcrumb items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` }
        ]} />
        <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center text-sm text-text-muted">
          <time dateTime={post.publishedAt?.toISOString()}>
            Published on {new Date(post.publishedAt || post.updatedAt || new Date()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </div>
      </header>

      <AdUnit slot="blog_post_top" format="auto" />

      {/* Since we don't have a markdown parser setup yet, we assume HTML content or dangerouslySetInnerHTML. 
          For a real setup, we'd use next-mdx-remote or similar. */}
      <div 
        className="prose prose-lg max-w-none prose-headings:font-display prose-a:text-accent hover:prose-a:text-blue-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <AdUnit slot="blog_post_mid" format="rectangle" />

      {relatedCalcs.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl font-bold font-display mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedCalcs.map(calc => (
              <Link key={calc!.slug} href={`/${calc!.slug}`} className="block group">
                <div className="bg-surface border border-border rounded-xl p-6 hover:border-accent transition-all">
                  <h3 className="font-semibold text-text-primary group-hover:text-accent mb-2">
                    {calc!.title}
                  </h3>
                  <p className="text-sm text-text-muted line-clamp-2">
                    {calc!.metaDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
