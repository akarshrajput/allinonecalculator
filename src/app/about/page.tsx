import { Metadata } from 'next';
import { getGlobalKeywords } from '@/lib/calculatorData';

export const metadata: Metadata = {
  title: 'About Us | All In One Calculator',
  description: 'Learn more about All In One Calculator, our mission to provide free, accurate, and easy-to-use online calculators for everyone.',
  keywords: getGlobalKeywords(),
  alternates: {
    canonical: 'https://www.allinonecalculator.fun/about'
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">About All In One Calculator</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Free, accurate, and lightning-fast calculations for everyday life.
        </p>
      </div>

      <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p>
            At All In One Calculator, we believe that complex math shouldn't stand in the way of good decision making. 
            Whether you are trying to figure out your monthly mortgage payments, calculating your ideal daily caloric intake, 
            or just trying to convert kilometers to miles, we want to make it as simple as clicking a button.
          </p>
          <p className="mt-4">
            Our mission is to build the internet's most comprehensive, accurate, and easy-to-use directory of free calculators.
            We don't believe in paywalls, mandatory sign-ups, or complicated user interfaces. Just straight answers, instantly.
          </p>
        </section>

        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-bold text-gray-900">100% Free Always</h3>
              <p className="text-sm mt-1">We will never charge you to use our core calculators or gate our results behind a subscription.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Lightning Fast</h3>
              <p className="text-sm mt-1">Built on modern web architecture, our calculators run locally on your device for instant results.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Privacy First</h3>
              <p className="text-sm mt-1">Your sensitive financial and health data never leaves your browser. We don't save your calculations to our servers.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Expert Reviewed</h3>
              <p className="text-sm mt-1">Our formulas for finance and health are cross-referenced with industry standards to ensure accuracy.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
