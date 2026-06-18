'use client';

import { useState, useMemo, useEffect } from 'react';

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeEndDay, setIncludeEndDay] = useState(false);

  // Set default dates on mount (to avoid SSR hydration mismatch)
  useEffect(() => {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(nextMonth.toISOString().split('T')[0]);
  }, []);

  const results = useMemo(() => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    // Use UTC to avoid daylight saving time jumps altering day counts
    const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    const timeDiff = utcEnd - utcStart;
    
    // Convert ms to days
    let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (includeEndDay) {
      // If we include the end date, we add 1 day
      if (daysDiff >= 0) daysDiff += 1;
      else daysDiff -= 1; // if negative
    }

    const isPast = daysDiff < 0;
    const absDays = Math.abs(daysDiff);

    // Calculate Years, Months, Days approximation
    // This is a complex calendar math problem, but for simplicity we do a rough breakdown:
    let tempStart = new Date(start);
    let years = 0;
    let months = 0;
    let days = 0;

    if (!isPast) {
      tempStart = new Date(start);
      // add years
      while (new Date(tempStart.getFullYear() + 1, tempStart.getMonth(), tempStart.getDate()) <= end) {
        years++;
        tempStart.setFullYear(tempStart.getFullYear() + 1);
      }
      // add months
      while (new Date(tempStart.getFullYear(), tempStart.getMonth() + 1, tempStart.getDate()) <= end) {
        months++;
        tempStart.setMonth(tempStart.getMonth() + 1);
      }
      // remaining days
      days = Math.floor((end.getTime() - tempStart.getTime()) / (1000 * 60 * 60 * 24));
      if (includeEndDay) days++;
    }

    // Business days (Mon-Fri)
    let businessDays = 0;
    const startIdx = start.getDay(); // 0 is Sunday
    // Math to quickly find weekdays between dates
    // ... we'll do a simple loop if it's less than 10000 days to be safe
    if (absDays < 10000) {
      let current = new Date(utcStart);
      const target = new Date(utcEnd);
      const increment = isPast ? -1 : 1;
      
      let currentDays = 0;
      while (currentDays < absDays) {
        // If it's a weekday
        if (current.getUTCDay() !== 0 && current.getUTCDay() !== 6) {
          businessDays++;
        }
        current.setUTCDate(current.getUTCDate() + increment);
        currentDays++;
      }
    }

    return {
      daysDiff,
      absDays,
      isPast,
      years,
      months,
      days,
      businessDays,
      weeks: (absDays / 7).toFixed(1),
      hours: (absDays * 24).toLocaleString(),
      minutes: (absDays * 24 * 60).toLocaleString()
    };
  }, [startDate, endDate, includeEndDay]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:ring-2 focus:ring-accent outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg focus:ring-2 focus:ring-accent outline-none" />
          </div>

          <div className="pt-4 border-t border-border">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${includeEndDay ? 'bg-accent border-accent' : 'bg-white border-border group-hover:border-accent'}`}>
                {includeEndDay && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className="text-sm font-medium text-text-primary">Include the End Date</span>
            </label>
            <p className="text-xs text-text-muted mt-2 ml-8">Check this if you want to count the final day as a full 24 hours.</p>
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Total Difference</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  {results.absDays} <span className="text-2xl font-sans text-text-muted">days</span>
                </div>
                <p className="text-sm text-text-muted font-medium">
                  {results.isPast ? 'The end date is in the past.' : 'Between the two dates.'}
                </p>
              </div>

              {!results.isPast && (
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Breakdown</div>
                  <div className="font-semibold text-text-primary">
                    {results.years > 0 && `${results.years} Years, `}
                    {results.months > 0 && `${results.months} Months, `}
                    {results.days} Days
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Business Days</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    {results.businessDays}
                  </div>
                  <div className="text-xs text-text-muted mt-1">Excludes weekends</div>
                </div>
                <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Weeks</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    {results.weeks}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Hours</div>
                  <div className="font-mono font-semibold text-text-primary">
                    {results.hours}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Minutes</div>
                  <div className="font-mono font-semibold text-text-primary">
                    {results.minutes}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Select two dates to calculate the exact difference in days.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
