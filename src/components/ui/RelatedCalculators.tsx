import Link from 'next/link';

interface RelatedCalculator {
  title: string;
  slug: string;
  description: string;
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
}

export default function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  if (!calculators || calculators.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Calculators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc) => (
          <Link key={calc.slug} href={`/${calc.slug}`} className="block group">
            <div className="bg-surface border border-border rounded-xl p-6 h-full hover:border-accent hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent mb-2">
                {calc.title}
              </h3>
              <p className="text-sm text-text-muted line-clamp-2">
                {calc.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
