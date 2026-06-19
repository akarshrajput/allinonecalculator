import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCalculatorData, getAllCalculators } from '@/lib/calculatorData';
import Breadcrumb from '@/components/ui/Breadcrumb';
import AdUnit from '@/components/ui/AdUnit';
import FAQSection from '@/components/ui/FAQSection';
import RelatedCalculators from '@/components/ui/RelatedCalculators';
import StructuredData, { generateWebApplicationSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/components/seo/StructuredData';
import PercentageCalculator from '@/components/calculators/PercentageCalculator';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import BMICalculator from '@/components/calculators/BMICalculator';
import AgeCalculator from '@/components/calculators/AgeCalculator';
import ReverseMortgageCalculator from '@/components/calculators/ReverseMortgageCalculator';
import LoanCalculator from '@/components/calculators/LoanCalculator';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import DebtPayoffCalculator from '@/components/calculators/DebtPayoffCalculator';
import MortgageRecastCalculator from '@/components/calculators/MortgageRecastCalculator';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import SalaryCalculator from '@/components/calculators/SalaryCalculator';
import CalorieCalculator from '@/components/calculators/CalorieCalculator';
import TDEECalculator from '@/components/calculators/TDEECalculator';
import IdealWeightCalculator from '@/components/calculators/IdealWeightCalculator';
import BodyFatCalculator from '@/components/calculators/BodyFatCalculator';
import PregnancyCalculator from '@/components/calculators/PregnancyCalculator';
import FractionCalculator from '@/components/calculators/FractionCalculator';
import ScientificCalculator from '@/components/calculators/ScientificCalculator';
import RootCalculator from '@/components/calculators/RootCalculator';
import FactorialCalculator from '@/components/calculators/FactorialCalculator';
import LengthConverter from '@/components/calculators/LengthConverter';
import WeightConverter from '@/components/calculators/WeightConverter';
import TemperatureConverter from '@/components/calculators/TemperatureConverter';
import AreaConverter from '@/components/calculators/AreaConverter';
import VolumeConverter from '@/components/calculators/VolumeConverter';
import FlooringCalculator from '@/components/calculators/FlooringCalculator';
import PaintingCalculator from '@/components/calculators/PaintingCalculator';
import ElectricityBillCalculator from '@/components/calculators/ElectricityBillCalculator';
import AutoLoanRefinanceCalculator from '@/components/calculators/AutoLoanRefinanceCalculator';
import CapRateCalculator from '@/components/calculators/CapRateCalculator';
import FreelanceRateCalculator from '@/components/calculators/FreelanceRateCalculator';
import EcommerceFeeCalculator from '@/components/calculators/EcommerceFeeCalculator';
import PaymentFeeCalculator from '@/components/calculators/PaymentFeeCalculator';
import SocialMediaRevenueCalculator from '@/components/calculators/SocialMediaRevenueCalculator';
import EvChargingCalculator from '@/components/calculators/EvChargingCalculator';
import TimeDurationCalculator from '@/components/calculators/TimeDurationCalculator';
import DateDifferenceCalculator from '@/components/calculators/DateDifferenceCalculator';
import PetAgeCalculator from '@/components/calculators/PetAgeCalculator';
import BacCalculator from '@/components/calculators/BacCalculator';
import KetoMacrosCalculator from '@/components/calculators/KetoMacrosCalculator';
import OvulationCalculator from '@/components/calculators/OvulationCalculator';
import PaceCalculator from '@/components/calculators/PaceCalculator';

// We map components to their slugs
const CalculatorComponents: Record<string, React.ElementType> = {
  'percentage-calculator': PercentageCalculator,
  'mortgage-calculator': MortgageCalculator,
  'bmi-calculator': BMICalculator,
  'age-calculator': AgeCalculator,
  'reverse-mortgage-calculator': ReverseMortgageCalculator,
  'loan-calculator': LoanCalculator,
  'retirement-calculator': RetirementCalculator,
  'debt-payoff-calculator': DebtPayoffCalculator,
  'mortgage-recast-calculator': MortgageRecastCalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'salary-calculator': SalaryCalculator,
  'calorie-calculator': CalorieCalculator,
  'tdee-calculator': TDEECalculator,
  'ideal-weight-calculator': IdealWeightCalculator,
  'body-fat-calculator': BodyFatCalculator,
  'pregnancy-calculator': PregnancyCalculator,
  'fraction-calculator': FractionCalculator,
  'scientific-calculator': ScientificCalculator,
  'root-calculator': RootCalculator,
  'factorial-calculator': FactorialCalculator,
  'length-converter': LengthConverter,
  'weight-converter': WeightConverter,
  'temperature-converter': TemperatureConverter,
  'area-converter': AreaConverter,
  'volume-converter': VolumeConverter,
  'flooring-calculator': FlooringCalculator,
  'painting-calculator': PaintingCalculator,
  'electricity-bill-calculator': ElectricityBillCalculator,
  'auto-loan-refinance-calculator': AutoLoanRefinanceCalculator,
  'cap-rate-calculator': CapRateCalculator,
  'freelance-hourly-rate-calculator': FreelanceRateCalculator,
  'ecommerce-fee-calculator': EcommerceFeeCalculator,
  'payment-fee-calculator': PaymentFeeCalculator,
  'social-media-revenue-calculator': SocialMediaRevenueCalculator,
  'ev-charging-cost-calculator': EvChargingCalculator,
  'time-duration-calculator': TimeDurationCalculator,
  'date-difference-calculator': DateDifferenceCalculator,
  'pet-age-calculator': PetAgeCalculator,
  'bac-calculator': BacCalculator,
  'keto-macros-calculator': KetoMacrosCalculator,
  'ovulation-calculator': OvulationCalculator,
  'pace-calculator': PaceCalculator,
  // Add others here
};

interface PageProps {
  params: {
    calculatorSlug: string;
  };
}

export async function generateStaticParams() {
  const calculators = getAllCalculators();
  return calculators.map((calc) => ({
    calculatorSlug: calc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const calc = getCalculatorData(params.calculatorSlug);
  if (!calc) return {};

  return {
    title: calc.metaTitle,
    description: calc.metaDescription,
    keywords: calc.keywords.join(', '),
    authors: [{ name: 'CalculatorHub' }],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
    },
    openGraph: {
      title: calc.ogTitle || calc.title,
      description: calc.ogDescription || calc.metaDescription,
      url: `https://www.allinonecalculator.fun/${calc.slug}`,
      siteName: 'All In One Calculator',
      type: 'website',
      images: [{ url: `/og/${calc.slug}.png`, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.ogTitle || calc.title,
      description: calc.ogDescription || calc.metaDescription,
      images: [`/og/${calc.slug}.png`]
    },
    alternates: {
      canonical: `https://www.allinonecalculator.fun/${calc.slug}`,
    }
  };
}

export default function CalculatorPage({ params }: PageProps) {
  const calc = getCalculatorData(params.calculatorSlug);
  
  if (!calc) {
    notFound();
  }

  const CalculatorTool = CalculatorComponents[calc.slug];
  if (!CalculatorTool) {
    return <div>Calculator coming soon.</div>;
  }

  // Schema Generation
  const webAppSchema = generateWebApplicationSchema(calc);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: 'https://www.allinonecalculator.fun', position: 1 },
    { name: 'Calculators', item: `https://www.allinonecalculator.fun`, position: 2 },
    { name: calc.title, item: `https://www.allinonecalculator.fun/${calc.slug}`, position: 3 }
  ]);
  
  // Note: the full FAQ question mapping logic would query DB or use full mock, for now we will stub answers.
  const faqs = calc.faqQuestions.map(q => ({
    question: q,
    answer: "This is a detailed placeholder answer for " + q + " to satisfy schema and content length requirements. In production, this would map to a database field or extended config."
  }));
  const faqSchema = generateFAQSchema(faqs);

  const related = calc.relatedCalculators.map(slug => getCalculatorData(slug)).filter(Boolean).map(c => ({
    title: c!.title,
    slug: c!.slug,
    description: c!.metaDescription
  }));

  return (
    <article className="max-w-5xl mx-auto">
      <StructuredData data={webAppSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      
      <Breadcrumb items={[
        { label: 'Calculators', href: '/' },
        { label: calc.title, href: `/${calc.slug}` }
      ]} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">{calc.h1}</h1>
            <p className="text-lg text-text-muted">{calc.metaDescription}</p>
          </header>

          <section aria-label="Calculator Tool">
            <CalculatorTool />
          </section>
          
          <div className="lg:hidden mt-8">
            <AdUnit slot="mobile_banner" format="auto" />
          </div>

          <section className="mt-16 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold font-display text-text-primary">How to Use the {calc.title}</h2>
            <p>Using our {calc.primaryKeyword} is simple and fast. Just follow these steps:</p>
            <ul>
              <li>Determine which calculation mode you need.</li>
              <li>Enter your values into the input fields.</li>
              <li>The result will automatically calculate and display below.</li>
            </ul>
            
            <h2 className="text-2xl font-bold font-display text-text-primary mt-8">Understanding Your Results</h2>
            <p>The results provided by this tool are calculated instantly using standard mathematical formulas. If you see an unexpected result, ensure your input values are correctly formatted without any extra characters.</p>
          </section>
          
          <AdUnit slot="mid_content" format="rectangle" className="my-12" />
          
          <FAQSection faqs={faqs} />
          
          <RelatedCalculators calculators={related} />
        </div>
        
        <aside className="hidden lg:block space-y-8">
          <AdUnit slot="sidebar_top" format="rectangle" />
          <div className="sticky top-24">
            <AdUnit slot="sidebar_sticky" format="rectangle" />
          </div>
        </aside>
      </div>
    </article>
  );
}
