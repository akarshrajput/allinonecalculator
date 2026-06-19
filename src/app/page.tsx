import { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/ui/AdUnit';
import { getAllCalculators, getGlobalKeywords } from '@/lib/calculatorData';
import { homeFaqs } from '@/lib/faqData';
import StructuredData, { generateFAQSchema } from '@/components/seo/StructuredData';
import FAQSection from '@/components/ui/FAQSection';

const homepageKeywords = getGlobalKeywords();

export const metadata: Metadata = {
  title: 'Free Online Calculators — Finance, Health, Math & More | All In One Calculator',
  description: 'Free online calculators for mortgage, BMI, loan, percentage, calories and more. Fast, accurate, no sign-up needed.',
  keywords: homepageKeywords,
};

export default function HomePage() {
  const calculators = getAllCalculators();

  const categories = [
    { id: 'finance', name: 'Finance & Business' },
    { id: 'health', name: 'Health & Fitness' },
    { id: 'math', name: 'Math & Time' },
    { id: 'conversion', name: 'Conversion & Utility' },
    { id: 'home', name: 'Home & Everyday' },
  ];

  // Pick some top calculators for the popular section
  const popularSlugs = ['percentage-calculator', 'mortgage-calculator', 'bmi-calculator', 'tdee-calculator', 'freelance-hourly-rate-calculator', 'time-duration-calculator', 'social-media-revenue-calculator', 'age-calculator'];
  const popular = popularSlugs.map(slug => calculators.find(c => c.slug === slug)).filter(Boolean);

  return (
    <div className="space-y-16 max-w-7xl mx-auto">
      <section className="text-center space-y-4 pt-16 pb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary tracking-tight">
          Free Online Calculators & Converters
        </h1>
        <p className="text-lg text-text-muted max-w-3xl mx-auto font-medium leading-relaxed">
          Fast, accurate all-in-one tools for mortgage, loan, BMI, calorie, percentage, and unit conversions. 100% free with no sign-up or registration required.
        </p>
      </section>

      <AdUnit slot="homepage_hero" format="auto" />

      <section>
        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
          <h2 className="text-2xl font-bold font-display text-text-primary">Most Popular</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popular.map((calc, i) => calc && (
            <Link key={i} href={`/${calc.slug}`} className="block group">
              <div className="bg-surface border border-border rounded-xl p-5 h-full hover:border-accent hover:shadow-md transition-all flex items-center">
                <div className="w-8 h-8 rounded-lg bg-accent-light text-accent flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-text-primary group-hover:text-accent line-clamp-2 text-sm">
                  {calc.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-16">
        {categories.map(category => {
          const categoryCalcs = calculators.filter(c => c.category === category.id);
          
          if (categoryCalcs.length === 0) return null;

          return (
            <section key={category.id} className="pt-8 border-t border-border/50">
              <h2 className="text-2xl font-bold font-display text-text-primary mb-8">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryCalcs.map((calc, i) => (
                  <Link key={i} href={`/${calc.slug}`} className="block group">
                    <div className="bg-surface border border-border rounded-xl p-5 h-full hover:border-accent hover:shadow-md transition-all flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-accent-light text-accent flex items-center justify-center font-bold mr-3 flex-shrink-0">
                        {i + 1}
                      </div>
                      <h3 className="font-semibold text-text-primary group-hover:text-accent line-clamp-2 text-sm">
                        {calc.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
      
      <div className="pt-12">
        <AdUnit slot="homepage_bottom" format="rectangle" />
      </div>

      {/* Intro & FAQ Section */}
      <div className="mt-20 pt-16 border-t border-border space-y-16">
        {/* Schema injection */}
        <StructuredData data={generateFAQSchema(homeFaqs)} />
        
        <FAQSection faqs={homeFaqs} />
      </div>
    </div>
  );
}
