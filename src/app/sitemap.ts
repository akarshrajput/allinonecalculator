import { MetadataRoute } from 'next';
import { getAllCalculators } from '@/lib/calculatorData';
import { BlogPost } from '@/models/BlogPost';
import connectToDatabase from '@/lib/mongodb';

// Mock function for states
function getAllUSStates() {
  return [
    { slug: 'idaho', name: 'Idaho' },
    { slug: 'montana', name: 'Montana' },
    { slug: 'nebraska', name: 'Nebraska' },
    { slug: 'alaska', name: 'Alaska' },
    // more states would go here
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const calculators = getAllCalculators();
  const states = getAllUSStates();
  
  let blogPosts: any[] = [];
  try {
    await connectToDatabase();
    blogPosts = await BlogPost.find({}).select('slug updatedAt').lean();
  } catch (err) {
    console.error('Failed to fetch blog posts for sitemap', err);
  }

  const calculatorUrls = calculators.map(calc => ({
    url: `https://www.allinonecalculator.fun/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const stateUrls = states.map(state => ({
    url: `https://www.allinonecalculator.fun/mortgage-calculator/${state.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map(post => ({
    url: `https://www.allinonecalculator.fun/blog/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: 'https://www.allinonecalculator.fun', priority: 1.0, changeFrequency: 'daily' },
    { url: 'https://www.allinonecalculator.fun/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: 'https://www.allinonecalculator.fun/contact', priority: 0.8, changeFrequency: 'monthly' },
    { url: 'https://www.allinonecalculator.fun/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
    { url: 'https://www.allinonecalculator.fun/terms', priority: 0.5, changeFrequency: 'yearly' },
    ...calculatorUrls,
    ...stateUrls,
    ...blogUrls,
  ];
}
