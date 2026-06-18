'use client';

import { useState, useMemo } from 'react';
import { calculateIdealWeight, IdealWeightInputs } from '@/lib/calculators/idealWeight';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function IdealWeightCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  const [heightCm, setHeightCm] = useState<string>('175');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');

  const results = useMemo(() => {
    let h = 0;
    if (unitSystem === 'metric') {
      h = parseFloat(heightCm);
    } else {
      const totalInches = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0);
      h = totalInches * 2.54;
    }

    if (!h || h <= 0) return null;

    return calculateIdealWeight({
      gender,
      height: h
    });
  }, [unitSystem, gender, heightCm, heightFt, heightIn]);

  const displayWeight = (kg: number) => {
    if (unitSystem === 'metric') {
      return `${kg.toFixed(1)} kg`;
    }
    const lbs = kg * 2.20462;
    return `${lbs.toFixed(1)} lbs`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`font-semibold ${unitSystem === 'imperial' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Imperial (lbs, ft)
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
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full px-4 py-2">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {unitSystem === 'metric' ? (
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Height (cm)</label>
              <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-2" />
            </div>
          ) : (
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
          )}
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Healthy BMI Range</h3>
                <div className="text-3xl font-mono font-bold text-success mb-2">
                  {displayWeight(results.healthyRangeMin)} - {displayWeight(results.healthyRangeMax)}
                </div>
                <p className="text-sm text-text-muted">
                  Based on the standard World Health Organization (WHO) healthy BMI range of 18.5 - 24.9.
                </p>
              </div>
              
              <div className="mt-4 p-4 border border-border rounded-lg bg-surface">
                <h4 className="font-semibold text-text-primary mb-4 border-b border-border pb-2">Ideal Weight Formulas</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Robinson Formula (1983)</span>
                    <span className="font-mono font-semibold text-text-primary">{displayWeight(results.robinson)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Miller Formula (1983)</span>
                    <span className="font-mono font-semibold text-text-primary">{displayWeight(results.miller)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Devine Formula (1974)</span>
                    <span className="font-mono font-semibold text-text-primary">{displayWeight(results.devine)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Hamwi Formula (1964)</span>
                    <span className="font-mono font-semibold text-text-primary">{displayWeight(results.hamwi)}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your height and gender to see your ideal weight range.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
