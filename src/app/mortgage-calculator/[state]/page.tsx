import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AdUnit from '@/components/ui/AdUnit';

const STATES = [
  { slug: 'idaho', name: 'Idaho', avgTax: '3500', avgPrice: '450000' },
  { slug: 'montana', name: 'Montana', avgTax: '3100', avgPrice: '430000' },
  { slug: 'nebraska', name: 'Nebraska', avgTax: '4200', avgPrice: '280000' },
  { slug: 'alaska', name: 'Alaska', avgTax: '3800', avgPrice: '350000' }
];

export async function generateStaticParams() {
  return STATES.map(state => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const stateData = STATES.find(s => s.slug === params.state);
  if (!stateData) return {};
  
  const currentYear = new Date().getFullYear();
  
  return {
    title: `${stateData.name} Mortgage Calculator — ${currentYear} Payment Estimator | All In One Calculator`,
    description: `Calculate your ${stateData.name} mortgage payment with local property tax rates. Free ${stateData.name} home loan calculator with full amortization table.`,
    alternates: {
      canonical: `https://www.allinonecalculator.fun/mortgage-calculator/${stateData.slug}`
    }
  };
}

export default function StateMortgageCalculatorPage({ params }: { params: { state: string } }) {
  const stateData = STATES.find(s => s.slug === params.state);
  if (!stateData) notFound();

  return (
    <article className="max-w-5xl mx-auto">
      <Breadcrumb items={[
        { label: 'Calculators', href: '/' },
        { label: 'Mortgage Calculator', href: '/mortgage-calculator' },
        { label: `${stateData.name} Mortgage Calculator`, href: `/mortgage-calculator/${stateData.slug}` }
      ]} />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">{stateData.name} Mortgage Calculator</h1>
        <p className="text-lg text-text-muted">
          Estimate your monthly mortgage payments in {stateData.name}. We've pre-filled the average property taxes for {stateData.name} (${stateData.avgTax}/year) and an average home price (${stateData.avgPrice}) to give you a more accurate estimate.
        </p>
      </header>
      
      <section className="mb-12">
        <MortgageCalculator />
      </section>
      
      <AdUnit slot="mid_content" />
      
      <section className="mt-12 prose max-w-none">
        <h2 className="text-2xl font-bold font-display text-text-primary">Buying a Home in {stateData.name}</h2>
        <p>
          When planning to buy a home in {stateData.name}, it's important to factor in local property tax rates, which can significantly affect your monthly payment. Use the calculator above to adjust your down payment, interest rate, and loan term to see how different scenarios fit your budget.
        </p>
      </section>
    </article>
  );
}
