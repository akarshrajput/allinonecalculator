'use client';

import { useState, useCallback, useMemo } from 'react';
import { calculatePercentageOf, calculateIsWhatPercentage, calculatePercentageChange } from '@/lib/calculators/percentage';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'of' | 'what' | 'change'>('of');
  
  // Mode 1: What is X% of Y?
  const [percentage, setPercentage] = useState<string>('');
  const [value1, setValue1] = useState<string>('');

  // Mode 2: X is what percent of Y?
  const [part, setPart] = useState<string>('');
  const [whole, setWhole] = useState<string>('');

  // Mode 3: Percentage change from X to Y?
  const [oldVal, setOldVal] = useState<string>('');
  const [newVal, setNewVal] = useState<string>('');

  const result1 = useMemo(() => {
    const p = parseFloat(percentage);
    const v = parseFloat(value1);
    if (isNaN(p) || isNaN(v)) return null;
    return calculatePercentageOf(p, v);
  }, [percentage, value1]);

  const result2 = useMemo(() => {
    const p = parseFloat(part);
    const w = parseFloat(whole);
    if (isNaN(p) || isNaN(w) || w === 0) return null;
    return calculateIsWhatPercentage(p, w);
  }, [part, whole]);

  const result3 = useMemo(() => {
    const o = parseFloat(oldVal);
    const n = parseFloat(newVal);
    if (isNaN(o) || isNaN(n) || o === 0) return null;
    return calculatePercentageChange(o, n);
  }, [oldVal, newVal]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setMode('of')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'of' ? 'bg-accent text-white' : 'bg-surface border border-border text-text-primary hover:bg-gray-50'}`}
        >
          X% of Y
        </button>
        <button
          onClick={() => setMode('what')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'what' ? 'bg-accent text-white' : 'bg-surface border border-border text-text-primary hover:bg-gray-50'}`}
        >
          X is what % of Y
        </button>
        <button
          onClick={() => setMode('change')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'change' ? 'bg-accent text-white' : 'bg-surface border border-border text-text-primary hover:bg-gray-50'}`}
        >
          % Change
        </button>
      </div>

      {mode === 'of' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">What is</label>
              <div className="relative">
                <input
                  type="number"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full px-4 py-2 pr-8"
                  placeholder="20"
                />
                <span className="absolute right-3 top-2 text-text-muted">%</span>
              </div>
            </div>
            <span className="font-medium text-text-muted pt-6">of</span>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">Value</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="150"
              />
            </div>
          </div>
          {result1 !== null && (
            <div className="mt-8">
              <ResultDisplay label="Result" value={result1.toLocaleString(undefined, { maximumFractionDigits: 4 })} highlight={true} subValue={`Formula: (${percentage} / 100) × ${value1} = ${result1}`} />
            </div>
          )}
        </div>
      )}

      {mode === 'what' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">Value</label>
              <input
                type="number"
                value={part}
                onChange={(e) => setPart(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="30"
              />
            </div>
            <span className="font-medium text-text-muted pt-6">is what % of</span>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">Total</label>
              <input
                type="number"
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="150"
              />
            </div>
          </div>
          {result2 !== null && (
            <div className="mt-8">
              <ResultDisplay label="Result" value={`${result2.toLocaleString(undefined, { maximumFractionDigits: 4 })}%`} highlight={true} subValue={`Formula: (${part} / ${whole}) × 100 = ${result2}%`} />
            </div>
          )}
        </div>
      )}

      {mode === 'change' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">From</label>
              <input
                type="number"
                value={oldVal}
                onChange={(e) => setOldVal(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="50"
              />
            </div>
            <span className="font-medium text-text-muted pt-6">to</span>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-text-muted mb-1">To</label>
              <input
                type="number"
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="75"
              />
            </div>
          </div>
          {result3 !== null && (
            <div className="mt-8">
              <ResultDisplay 
                label={`${result3 > 0 ? 'Increase' : result3 < 0 ? 'Decrease' : 'Change'}`} 
                value={`${Math.abs(result3).toLocaleString(undefined, { maximumFractionDigits: 4 })}%`} 
                highlight={true} 
                subValue={`Formula: ((${newVal} - ${oldVal}) / ${oldVal}) × 100 = ${result3}%`} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
