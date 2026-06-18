'use client';

import { useState, useMemo, useEffect } from 'react';

export default function OvulationCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [lutealPhaseLength, setLutealPhaseLength] = useState('14');

  // Set default date to today minus 14 days
  useEffect(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 14);
    setLastPeriodDate(defaultDate.toISOString().split('T')[0]);
  }, []);

  const results = useMemo(() => {
    if (!lastPeriodDate) return null;

    const start = new Date(lastPeriodDate);
    const cycle = parseInt(cycleLength, 10);
    const luteal = parseInt(lutealPhaseLength, 10);

    if (isNaN(start.getTime()) || isNaN(cycle) || isNaN(luteal)) return null;
    if (cycle < 20 || cycle > 45) return null;
    if (luteal < 10 || luteal > 16) return null;

    // Use UTC to avoid timezone shifts
    const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());

    // Next period starts = Last period + cycle length
    const nextPeriodDate = new Date(utcStart + (cycle * 24 * 60 * 60 * 1000));
    
    // Ovulation date = Next period - luteal phase length
    const ovulationDate = new Date(nextPeriodDate.getTime() - (luteal * 24 * 60 * 60 * 1000));

    // Fertile window is typically 5 days before ovulation + the day of ovulation
    const fertileStart = new Date(ovulationDate.getTime() - (5 * 24 * 60 * 60 * 1000));
    const fertileEnd = new Date(ovulationDate.getTime() + (1 * 24 * 60 * 60 * 1000)); // sometimes +1 day for egg survival

    // Expected Due Date if conception occurs this cycle (add 280 days from LAST period)
    const dueDate = new Date(utcStart + (280 * 24 * 60 * 60 * 1000));

    // Safe days approximation (very basic rhythm method, not for actual contraception)
    const safeStart1 = new Date(utcStart);
    const safeEnd1 = new Date(fertileStart.getTime() - (1 * 24 * 60 * 60 * 1000));
    const safeStart2 = new Date(fertileEnd.getTime() + (1 * 24 * 60 * 60 * 1000));
    const safeEnd2 = new Date(nextPeriodDate.getTime() - (1 * 24 * 60 * 60 * 1000));

    return {
      ovulationDate: ovulationDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }),
      fertileStart: fertileStart.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }),
      fertileEnd: fertileEnd.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }),
      nextPeriodDate: nextPeriodDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }),
      dueDate: dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
      safePhase1: `${safeStart1.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })} - ${safeEnd1.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}`,
      safePhase2: `${safeStart2.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })} - ${safeEnd2.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}`
    };
  }, [lastPeriodDate, cycleLength, lutealPhaseLength]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">First Day of Last Period</label>
            <input type="date" value={lastPeriodDate} onChange={(e) => setLastPeriodDate(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:ring-2 focus:ring-accent outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Average Cycle Length</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} min="20" max="45" className="w-full px-3 py-2 outline-none" />
                <div className="px-3 py-2 bg-gray-50 border-l border-border text-text-muted text-xs flex items-center">days</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Luteal Phase</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <input type="number" value={lutealPhaseLength} onChange={(e) => setLutealPhaseLength(e.target.value)} min="10" max="16" className="w-full px-3 py-2 outline-none" />
                <div className="px-3 py-2 bg-gray-50 border-l border-border text-text-muted text-xs flex items-center">days</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 border border-border rounded-lg text-xs text-text-muted">
            <strong>Tip:</strong> The luteal phase is the time between ovulation and your next period. It is almost always exactly 14 days for most women, even if your total cycle length varies. Leave as 14 if unsure.
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Estimated Ovulation Date</h3>
                <div className="text-3xl font-bold text-success mb-2">
                  {results.ovulationDate}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  This is your most fertile day.
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                <div className="text-sm text-purple-800 mb-1 font-semibold">Highly Fertile Window</div>
                <div className="font-mono font-bold text-purple-900 text-lg">
                  {results.fertileStart} to {results.fertileEnd}
                </div>
                <div className="text-xs text-purple-700 mt-1">Having intercourse during these days maximizes chances of conception.</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-xs text-text-muted mb-1 uppercase tracking-wide font-semibold">Next Period Starts</div>
                  <div className="font-semibold text-text-primary">
                    {results.nextPeriodDate}
                  </div>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-xs text-text-muted mb-1 uppercase tracking-wide font-semibold">Expected Due Date*</div>
                  <div className="font-semibold text-text-primary">
                    {results.dueDate}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800">
                <strong>Disclaimer:</strong> This calculator is an estimate based on averages. Cycle lengths fluctuate. <strong>Do not use this calendar as a reliable method of contraception to prevent pregnancy.</strong>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter the first day of your last period to calculate your fertile window.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
