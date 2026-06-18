'use client';

import { useState, useMemo } from 'react';
import { calculateBodyFat } from '@/lib/calculators/bodyFat';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function BodyFatCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('30');
  
  // Metric (cm, kg)
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('70');
  const [neckCm, setNeckCm] = useState<string>('38');
  const [waistCm, setWaistCm] = useState<string>('85');
  const [hipCm, setHipCm] = useState<string>('95'); // Required for females
  
  // Imperial (in, lbs)
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');
  const [weightLbs, setWeightLbs] = useState<string>('154');
  const [neckIn, setNeckIn] = useState<string>('15');
  const [waistIn, setWaistIn] = useState<string>('33.5');
  const [hipIn, setHipIn] = useState<string>('37.5');

  const results = useMemo(() => {
    let h = 0, w = 0, neck = 0, waist = 0, hip = 0;
    
    if (unitSystem === 'metric') {
      h = parseFloat(heightCm);
      w = parseFloat(weightKg);
      neck = parseFloat(neckCm);
      waist = parseFloat(waistCm);
      hip = parseFloat(hipCm);
    } else {
      const totalInches = (parseInt(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      h = totalInches * 2.54;
      w = parseFloat(weightLbs) * 0.453592;
      neck = parseFloat(neckIn) * 2.54;
      waist = parseFloat(waistIn) * 2.54;
      hip = parseFloat(hipIn) * 2.54;
    }

    const a = parseInt(age);

    if (!h || !w || !neck || !waist || !a) return null;
    if (gender === 'female' && !hip) return null;

    return calculateBodyFat({
      gender,
      age: a,
      weight: w,
      height: h,
      neck,
      waist,
      hip: gender === 'female' ? hip : undefined
    });
  }, [unitSystem, gender, age, heightCm, weightKg, neckCm, waistCm, hipCm, heightFt, heightIn, weightLbs, neckIn, waistIn, hipIn]);

  const displayWeight = (kg: number) => {
    if (unitSystem === 'metric') return `${kg.toFixed(1)} kg`;
    return `${(kg * 2.20462).toFixed(1)} lbs`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`font-semibold ${unitSystem === 'imperial' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Imperial (lbs, in)
        </button>
        <button
          onClick={() => setUnitSystem('metric')}
          className={`font-semibold ${unitSystem === 'metric' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Metric (kg, cm)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full px-4 py-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-2" />
            </div>
          </div>

          {unitSystem === 'metric' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Height (cm)</label>
                  <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Weight (kg)</label>
                  <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Neck (cm)</label>
                  <input type="number" step="0.1" value={neckCm} onChange={(e) => setNeckCm(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Waist (cm)</label>
                  <input type="number" step="0.1" value={waistCm} onChange={(e) => setWaistCm(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </div>
              {gender === 'female' && (
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Hip (cm)</label>
                  <input type="number" step="0.1" value={hipCm} onChange={(e) => setHipCm(e.target.value)} className="w-full px-4 py-2" />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Height (ft)</label>
                  <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Height (in)</label>
                  <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Weight (lbs)</label>
                <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full px-4 py-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Neck (in)</label>
                  <input type="number" step="0.1" value={neckIn} onChange={(e) => setNeckIn(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Waist (in)</label>
                  <input type="number" step="0.1" value={waistIn} onChange={(e) => setWaistIn(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </div>
              {gender === 'female' && (
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Hip (in)</label>
                  <input type="number" step="0.1" value={hipIn} onChange={(e) => setHipIn(e.target.value)} className="w-full px-4 py-2" />
                </div>
              )}
            </>
          )}
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Body Fat Percentage</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  {results.bodyFatPercentage.toFixed(1)}%
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Category: {results.category}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ResultDisplay 
                  label="Fat Mass" 
                  value={displayWeight(results.fatMass)} 
                />
                <ResultDisplay 
                  label="Lean Mass" 
                  value={displayWeight(results.leanMass)} 
                />
              </div>

              <p className="text-xs text-text-muted text-center mt-4">
                *Calculated using the U.S. Navy Body Fat formula.
              </p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Please enter all required measurements.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
