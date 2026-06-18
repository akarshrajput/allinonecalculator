'use client';

import { useState, useMemo } from 'react';
import { calculateAge } from '@/lib/calculators/age';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function AgeCalculator() {
  const [dob, setDob] = useState<string>('1990-01-01');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const results = useMemo(() => {
    if (!dob) return null;
    const d1 = new Date(dob);
    const d2 = targetDate ? new Date(targetDate) : new Date();
    
    // Valid dates?
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    if (d1 > d2) return null; // Born after target date

    return calculateAge(d1, d2);
  }, [dob, targetDate]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Age at the Date Of (Default: Today)</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-2"
            />
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Age</h3>
                <div className="text-4xl font-mono font-bold text-success">
                  {results.years} <span className="text-lg text-text-primary font-sans">years</span> {results.months} <span className="text-lg text-text-primary font-sans">months</span> {results.days} <span className="text-lg text-text-primary font-sans">days</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ResultDisplay label="Total Months" value={results.totalMonths} />
                <ResultDisplay label="Total Days" value={results.totalDays} />
                <ResultDisplay label="Next Birthday In" value={`${results.nextBirthdayDays} days`} highlight={false} />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Please enter a valid date of birth.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
