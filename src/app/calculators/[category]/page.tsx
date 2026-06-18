import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AdUnit from '@/components/ui/AdUnit';
import { getAllCalculators } from '@/lib/calculatorData';

const CATEGORIES = [
  { slug: 'finance', name: 'Finance Calculators', description: 'Take control of your finances with our free mortgage, loan, and investment calculators.' },
  { slug: 'health', name: 'Health Calculators', description: 'Track your fitness goals with our free BMI, calorie, and macro calculators.' },
  { slug: 'math', name: 'Math Calculators', description: 'Solve complex math problems instantly with our free online math calculators.' },
  { slug: 'home', name: 'Home & Lifestyle Calculators', description: 'Plan your home projects with our flooring, painting, and electricity bill calculators.' },
  { slug: 'fitness', name: 'Fitness & Nutrition', description: 'Optimize your workouts and diet with our fitness calculators.' },
  { slug: 'conversion', name: 'Converters', description: 'Easily convert units, currencies, and numbers with our free tools.' }
];

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryData = CATEGORIES.find(c => c.slug === params.category);
  if (!categoryData) return {};
  
  return {
    title: `${categoryData.name} — Free Online Tools | CalculatorHub`,
    description: categoryData.description,
    alternates: {
      canonical: `https://calculatorhub.com/calculators/${categoryData.slug}`
    }
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryData = CATEGORIES.find(c => c.slug === params.category);
  if (!categoryData) notFound();

  const calculators = getAllCalculators().filter(c => c.category === params.category);

  return (
    <article className="max-w-5xl mx-auto space-y-12">
      <header className="space-y-4 border-b border-border pb-8">
        <Breadcrumb items={[
          { label: 'Calculators', href: '/calculators' },
          { label: categoryData.name, href: `/calculators/${categoryData.slug}` }
        ]} />
        <h1 className="text-4xl font-display font-bold text-text-primary">{categoryData.name}</h1>
        <p className="text-xl text-text-muted">{categoryData.description}</p>
      </header>

      <AdUnit slot="category_top" format="auto" />

      {calculators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map(calc => (
            <Link key={calc.slug} href={`/${calc.slug}`} className="block group">
              <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-accent hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent mb-2">
                  {calc.title}
                </h3>
                <p className="text-sm text-text-muted line-clamp-3">
                  {calc.metaDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl bg-surface">
          <p className="text-text-muted">More calculators coming soon to this category!</p>
        </div>
      )}
      
      <AdUnit slot="category_bottom" format="auto" />
    </article>
  );
}
