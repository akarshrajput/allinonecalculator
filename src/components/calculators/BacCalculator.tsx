'use client';

import { useState, useMemo } from 'react';

export default function BacCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('160');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  
  const [drinks, setDrinks] = useState('3');
  const [hours, setHours] = useState('2');

  const results = useMemo(() => {
    const w = parseFloat(weight);
    const d = parseFloat(drinks);
    const h = parseFloat(hours);

    if (isNaN(w) || isNaN(d) || isNaN(h) || w <= 0 || d < 0 || h < 0) return null;

    // Widmark Formula for BAC
    // BAC = [Alcohol consumed in grams / (Body weight in grams x r)] x 100
    // r = Widmark factor (0.68 for men, 0.55 for women)

    // Standard US Drink = 14 grams of alcohol
    const alcoholGrams = d * 14;

    // Convert weight to grams
    const weightKg = weightUnit === 'lbs' ? w * 0.453592 : w;
    const weightGrams = weightKg * 1000;

    const r = gender === 'male' ? 0.68 : 0.55;

    // Gross BAC
    const rawBac = (alcoholGrams / (weightGrams * r)) * 100;

    // Metabolism (average body metabolizes 0.015 BAC per hour)
    const metabolized = h * 0.015;

    // Net BAC
    let bac = rawBac - metabolized;
    if (bac < 0) bac = 0;

    // Legal status (US is 0.08)
    const isLegalDriving = bac < 0.08;

    // Estimated time until sober (BAC = 0)
    const hoursToSober = bac / 0.015;

    return {
      bac,
      isLegalDriving,
      hoursToSober
    };
  }, [gender, weight, weightUnit, drinks, hours]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div className="flex space-x-4 border-b border-border pb-4">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${gender === 'male' ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent'}`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${gender === 'female' ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent'}`}
            >
              Female
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Body Weight</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-2 outline-none" />
              <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value as 'lbs'|'kg')} className="bg-gray-50 border-l border-border px-4 py-2 outline-none text-text-muted">
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
            <p className="text-xs text-text-muted mt-1">Weight significantly affects blood alcohol concentration.</p>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-text-primary mb-3">Drinking Session</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Number of Drinks</label>
                <input type="number" step="0.5" value={drinks} onChange={(e) => setDrinks(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Hours Since Started</label>
                <input type="number" step="0.5" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
              </div>
            </div>
            <div className="mt-3 p-3 bg-gray-50 border border-border rounded-lg text-xs text-text-muted">
              <strong>1 Standard US Drink</strong> = 1.5 oz of 40% Liquor = 5 oz of 12% Wine = 12 oz of 5% Beer.
            </div>
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className={`rounded-xl p-6 border text-center ${results.isLegalDriving ? 'bg-result-bg border-success' : 'bg-red-50 border-red-300'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${results.isLegalDriving ? 'text-text-primary' : 'text-red-800'}`}>Estimated BAC</h3>
                <div className={`text-6xl font-mono font-bold mb-2 ${results.bac === 0 ? 'text-text-primary' : results.isLegalDriving ? 'text-yellow-600' : 'text-red-600'}`}>
                  {results.bac.toFixed(3)}<span className="text-xl">%</span>
                </div>
                <div className={`font-semibold ${results.isLegalDriving ? 'text-success' : 'text-red-700'}`}>
                  {results.bac >= 0.08 ? '⚠️ Legally Intoxicated (Do Not Drive)' : results.bac > 0 ? '⚠️ Impaired (Exercise Caution)' : 'Sober'}
                </div>
              </div>

              {results.bac > 0 && (
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Estimated Time Until Sober (0.00% BAC)</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    ~{Math.floor(results.hoursToSober)}h {Math.round((results.hoursToSober % 1) * 60)}m
                  </div>
                  <div className="text-xs text-text-muted mt-1">Your body metabolizes approx 0.015% BAC per hour.</div>
                </div>
              )}
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
                <strong>Disclaimer:</strong> This calculator provides an <em>estimate</em> based on averages (Widmark formula) and should not be used to determine your legal or physical ability to drive. Food consumption, metabolism, and medication can drastically alter your real BAC. Never drink and drive.
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your weight, gender, and alcohol consumption to estimate your BAC.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
