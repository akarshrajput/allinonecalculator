'use client';

import { useState, useMemo } from 'react';

export default function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  
  // Optional break time deduction
  const [breakMinutes, setBreakMinutes] = useState('30');

  const results = useMemo(() => {
    if (!startTime || !endTime) return null;

    // Parse start time
    const [startHourStr, startMinuteStr] = startTime.split(':');
    let startH = parseInt(startHourStr, 10);
    const startM = parseInt(startMinuteStr, 10);

    // Parse end time
    const [endHourStr, endMinuteStr] = endTime.split(':');
    let endH = parseInt(endHourStr, 10);
    const endM = parseInt(endMinuteStr, 10);

    if (isNaN(startH) || isNaN(startM) || isNaN(endH) || isNaN(endM)) return null;

    // If end time is mathematically earlier than start time, assume it's the next day
    // e.g. Start 22:00, End 06:00
    let isNextDay = false;
    if (endH < startH || (endH === startH && endM < startM)) {
      endH += 24;
      isNextDay = true;
    }

    // Convert to total minutes since 00:00
    const startTotalMinutes = startH * 60 + startM;
    let endTotalMinutes = endH * 60 + endM;

    let totalDurationMinutes = endTotalMinutes - startTotalMinutes;

    // Deduct break
    const bMins = parseInt(breakMinutes, 10) || 0;
    
    // Ensure we don't deduct more break than the actual duration
    const validBreakMins = Math.min(bMins, totalDurationMinutes);
    
    const grossMinutes = totalDurationMinutes;
    const netMinutes = totalDurationMinutes - validBreakMins;

    // Convert to Hours and Minutes
    const grossH = Math.floor(grossMinutes / 60);
    const grossM = grossMinutes % 60;

    const netH = Math.floor(netMinutes / 60);
    const netM = netMinutes % 60;

    // Convert to Decimal Hours (e.g. 8.5 hours instead of 8h 30m) - Highly requested for payroll
    const netDecimal = netMinutes / 60;

    return {
      isNextDay,
      grossH,
      grossM,
      netH,
      netM,
      netDecimal,
      validBreakMins
    };
  }, [startTime, endTime, breakMinutes]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Start Time</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:ring-2 focus:ring-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">End Time</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:ring-2 focus:ring-accent outline-none" />
            </div>
          </div>
          
          {results?.isNextDay && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg">
              End time is earlier than start time. Assuming the shift ends the <strong>following day</strong>.
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium text-text-muted mb-1">Deduct Break Time (Minutes)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input type="number" value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)} className="w-full px-4 py-2 outline-none" placeholder="e.g. 30" />
              <div className="px-4 py-2 bg-gray-50 border-l border-border text-text-muted">mins</div>
            </div>
            <p className="text-xs text-text-muted mt-1">Leave as 0 if you don't want to deduct any breaks.</p>
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Total Paid Hours</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  {results.netH}h {results.netM}m
                </div>
                <p className="text-sm text-text-muted font-medium">
                  After deducting {results.validBreakMins} minutes of break time.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Gross Time</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    {results.grossH}h {results.grossM}m
                  </div>
                  <div className="text-xs text-text-muted mt-1">Before breaks</div>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Decimal Hours</div>
                  <div className="font-mono font-semibold text-accent text-xl">
                    {results.netDecimal.toFixed(2)} hrs
                  </div>
                  <div className="text-xs text-text-muted mt-1">Use this for payroll math</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border border-border rounded-lg text-sm text-text-muted">
                <strong>Payroll Tip:</strong> If your hourly rate is $20/hr, multiply it by the Decimal Hours ({results.netDecimal.toFixed(2)}) to get exactly ${(20 * results.netDecimal).toFixed(2)}.
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Select a start and end time to calculate the exact duration.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
