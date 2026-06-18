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
    </div>
  );
}
