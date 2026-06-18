'use client';

import { useState, useMemo } from 'react';
import { calculatePregnancy, PregnancyInputs } from '@/lib/calculators/pregnancy';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function PregnancyCalculator() {
  const [method, setMethod] = useState<PregnancyInputs['calcMethod']>('lmp');
  const [inputDate, setInputDate] = useState<string>('');
  const [ivfType, setIvfType] = useState<'3day' | '5day'>('5day');

  const results = useMemo(() => {
    if (!inputDate) return null;
    const d = new Date(inputDate);
    if (isNaN(d.getTime())) return null;

    return calculatePregnancy({
      calcMethod: method,
      date: d,
      ivfType: method === 'ivf' ? ivfType : undefined
    });
  }, [method, inputDate, ivfType]);

  const methodLabels = {
    lmp: 'First Day of Last Period',
    conception: 'Date of Conception',
    ultrasound: 'Ultrasound Estimated Due Date',
    ivf: 'IVF Transfer Date'
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-border mb-6 pb-4">
        {['lmp', 'conception', 'ultrasound', 'ivf'].map(m => (
          <button
            key={m}
            onClick={() => setMethod(m as any)}
            className={`font-semibold px-3 py-1 rounded-full text-sm ${method === m ? 'bg-accent text-white' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}`}
          >
            {m === 'lmp' ? 'Last Period' : m === 'conception' ? 'Conception Date' : m === 'ultrasound' ? 'Ultrasound EDD' : 'IVF Transfer'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">{methodLabels[method]}</label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-4 py-2"
            />
          </div>

          {method === 'ivf' && (
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Embryo Age</label>
              <select value={ivfType} onChange={(e) => setIvfType(e.target.value as any)} className="w-full px-4 py-2">
                <option value="3day">Day 3 Embryo</option>
                <option value="5day">Day 5 Embryo</option>
              </select>
            </div>
          )}
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Estimated Due Date</h3>
                <div className="text-3xl font-display font-bold text-success mb-2">
                  {results.estimatedDueDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  {results.daysRemaining} days remaining!
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ResultDisplay 
                  label="Gestational Age" 
                  value={`${results.gestationalAgeWeeks}w ${results.gestationalAgeDays}d`} 
                />
                <ResultDisplay 
                  label="Trimester" 
                  value={results.gestationalAgeWeeks <= 0 ? 'N/A' : `Trimester ${results.trimester}`} 
                />
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg flex justify-between items-center">
                <span className="font-medium text-sm text-text-muted">Estimated Conception Date</span>
                <span className="font-semibold text-text-primary text-sm">
                  {results.conceptionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Please select a calculation method and enter a date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
