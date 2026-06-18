import { Metadata } from 'next';
import Link from 'next/link';
import AdUnit from '@/components/ui/AdUnit';
import { getAllCalculators } from '@/lib/calculatorData';

export const metadata: Metadata = {
  title: 'Free Online Calculators — Finance, Health, Math & More | All In One Calculator',
  description: 'Free online calculators for mortgage, BMI, loan, percentage, calories and more. Fast, accurate, no sign-up needed.',
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
          Free Online Calculators
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto font-medium">
          Fast, accurate tools for finance, health, math, and everyday utility. Completely free, no sign-up required.
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

      <section className="mt-20 pt-16 border-t border-border prose prose-lg max-w-none text-text-muted">
        <h2 className="text-3xl font-bold text-text-primary mb-6">The Ultimate All-in-One Calculator</h2>
        <p>
          Welcome to the internet's most comprehensive <strong>all in one calculator</strong> platform. Instead of bouncing between dozens of spammy, slow websites to do your daily math, we built a lightning-fast, ad-lite application that houses every tool you could possibly need under one roof. Whether you are searching for an <strong>all-in-one calculator</strong> for complex real estate transactions, or simply need to convert temperatures while cooking, you'll find it here instantly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-4">Why Use AllInOneCalculator.fun?</h3>
            <ul className="space-y-2">
              <li><strong>100% Free Forever:</strong> We never gate our tools behind paywalls or subscriptions.</li>
              <li><strong>No Sign-Ups:</strong> We respect your privacy. No emails or accounts required to run a calculation.</li>
              <li><strong>Lightning Fast:</strong> Built on modern web architecture so you get your answers instantly without page reloads.</li>
              <li><strong>Mobile Optimized:</strong> The perfect <strong>all in one calculator</strong> for your phone browser, designed to feel like a native app.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-4">Tools for Every Need</h3>
            <p>
              Our growing library contains over 40 highly specialized calculators. From complex financial modeling (mortgage recasting, cap rates, and Etsy seller fees) to health tracking (BMI, body fat, and TDEE), this is your ultimate <strong>multi-purpose calculator</strong> hub. Bookmark this page and never search for another math tool again!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
