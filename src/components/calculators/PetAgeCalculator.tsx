'use client';

import { useState, useMemo } from 'react';

export default function PetAgeCalculator() {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [dogSize, setDogSize] = useState<'small' | 'medium' | 'large' | 'giant'>('medium');
  const [years, setYears] = useState('5');
  const [months, setMonths] = useState('0');

  const results = useMemo(() => {
    const y = parseInt(years) || 0;
    const m = parseInt(months) || 0;
    const totalMonths = (y * 12) + m;

    if (totalMonths <= 0) return null;

    let humanYears = 0;

    if (petType === 'cat') {
      // Cat aging logic
      if (totalMonths <= 1) humanYears = 1; // 1 month = 1 human year
      else if (totalMonths <= 3) humanYears = 4;
      else if (totalMonths <= 6) humanYears = 10;
      else if (totalMonths < 12) humanYears = 12;
      else if (totalMonths === 12) humanYears = 15;
      else if (totalMonths === 24) humanYears = 24;
      else {
        // After 2 years, each cat year = 4 human years
        humanYears = 24 + ((totalMonths - 24) / 12) * 4;
      }
    } else {
      // Dog aging logic (depends on size)
      if (totalMonths <= 2) humanYears = 2; // Puppy
      else if (totalMonths <= 6) humanYears = 10;
      else if (totalMonths < 12) humanYears = 12;
      else if (totalMonths === 12) humanYears = 15;
      else if (totalMonths === 24) humanYears = 24;
      else {
        const yearsOverTwo = (totalMonths - 24) / 12;
        // Base after 2 years is 24
        if (dogSize === 'small') {
          // Small dogs (under 20 lbs) age ~4 years per human year
          humanYears = 24 + (yearsOverTwo * 4);
        } else if (dogSize === 'medium') {
          // Medium dogs (21-50 lbs) age ~5 years per human year
          humanYears = 24 + (yearsOverTwo * 5);
        } else if (dogSize === 'large') {
          // Large dogs (51-100 lbs) age ~6 years per human year
          humanYears = 24 + (yearsOverTwo * 6);
        } else {
          // Giant dogs (over 100 lbs) age ~7 years per human year
          humanYears = 24 + (yearsOverTwo * 7);
        }
      }
    }

    return {
      humanYears: Math.floor(humanYears), // Return whole number for simplicity
      totalMonths
    };
  }, [petType, dogSize, years, months]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => setPetType('dog')}
          className={`font-semibold ${petType === 'dog' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Dog Age
        </button>
        <button
          onClick={() => setPetType('cat')}
          className={`font-semibold ${petType === 'cat' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Cat Age
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Age (Years)</label>
              <input type="number" value={years} onChange={(e) => setYears(e.target.value)} min="0" className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Age (Months)</label>
              <input type="number" value={months} onChange={(e) => setMonths(e.target.value)} min="0" max="11" className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>

          {petType === 'dog' && (
            <div className="pt-4 border-t border-border">
              <label className="block text-sm font-medium text-text-muted mb-3">Dog Size / Breed Weight</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDogSize('small')}
                  className={`py-2 px-3 border rounded-lg text-sm text-center ${dogSize === 'small' ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-white border-border text-text-muted'}`}
                >
                  Small (\u003C 20 lbs)
                </button>
                <button
                  onClick={() => setDogSize('medium')}
                  className={`py-2 px-3 border rounded-lg text-sm text-center ${dogSize === 'medium' ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-white border-border text-text-muted'}`}
                >
                  Medium (21-50 lbs)
                </button>
                <button
                  onClick={() => setDogSize('large')}
                  className={`py-2 px-3 border rounded-lg text-sm text-center ${dogSize === 'large' ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-white border-border text-text-muted'}`}
                >
                  Large (51-100 lbs)
                </button>
                <button
                  onClick={() => setDogSize('giant')}
                  className={`py-2 px-3 border rounded-lg text-sm text-center ${dogSize === 'giant' ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-white border-border text-text-muted'}`}
                >
                  Giant (\u003E 100 lbs)
                </button>
              </div>
            </div>
          )}
          
          <div className="p-4 bg-gray-50 border border-border rounded-lg text-xs text-text-muted">
            The old "1 year = 7 human years" myth is inaccurate. Pets age very rapidly in their first two years of life, and then the rate slows down and depends heavily on their mature body weight.
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Age in Human Years</h3>
                <div className="text-6xl font-mono font-bold text-success mb-2">
                  {results.humanYears}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Years old in human terms.
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                {petType === 'dog' ? (
                  <p><strong>Did you know?</strong> A dog reaches equivalent human adulthood (15 years old) by the time they are just 1 year old!</p>
                ) : (
                  <p><strong>Did you know?</strong> Cats mature extremely fast. A 6-month-old kitten is roughly the equivalent of a 10-year-old human child.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your pet's age to calculate their true equivalent age in human years.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Understanding Your Pet's Age</h2>
        <p>
          The old "1 year equals 7 years" rule is highly inaccurate. To get a true estimate, owners use a dedicated <strong>age calculator dog</strong> or cat tool to calculate their pet's maturity. This calculator acts as a comprehensive <strong>dog age calculator app</strong> and gives you the exact math needed to understand your furry friend.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Dog Age to Human Years</h3>
        <p>
          If you are wondering <strong>how to calculate dog age in human years</strong>, the formula changes based on the breed size. That's why using a <strong>dog age calculator chart</strong> or a specialized <strong>dog age calculator mixed breed</strong> / <strong>small dog age calculator</strong> is crucial. Owners frequently ask questions like "<strong>how old is 4 in dog years</strong>", "<strong>how old is a 12 year dog</strong>", or search for a specific <strong>10 in dog years</strong> or <strong>12 in dog years</strong> conversion. Using our <strong>dog age calculator human years</strong> (sometimes just called an <strong>age dog calculator</strong> or converting <strong>dog dog years</strong>), you can instantly answer queries like <strong>2 years in dog years</strong> or <strong>3 in dog years</strong>.
        </p>
        <p>
          Knowing exactly <strong>how old is 11 in dog years</strong> helps you adjust their diet and care—perhaps even prompting searches like <strong>how much sleep do dogs need by age calculator</strong>. It uses the same rigorous veterinary standards you'd expect from a <strong>purina dog age calculator</strong>.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Cat Age to Human Years</h3>
        <p>
          Felines age differently than canines. Many users ask "<strong>how do you calculate a cat's age</strong>" or "<strong>how to tell how old is a cat</strong>". By selecting the cat tab, this tool becomes a highly accurate <strong>cat age calculator</strong> (or <strong>cat age to human age calculator</strong>). Whether you want to know <strong>how old is my kitten</strong> or need a full <strong>cat age chart</strong>, we have you covered.
        </p>
        <p>
          It instantly performs the <strong>human years to cat years</strong> conversion, taking the guesswork out of <strong>how to calculate cats age</strong>. Some users search for it as the <strong>math cats age calculator</strong> (or <strong>age calculator math cats</strong>) to figure out <strong>cats age in human years</strong>. Whether you call it a <strong>cat age in human years calculator</strong>, a <strong>cat years in human years</strong> tool, or simply search for a <strong>cat age calculator in human years</strong> to see <strong>cat years to human years</strong>, the underlying veterinary math remains the same to help you care for your feline companion!
        </p>
      </div>
    </div>
  );
}
