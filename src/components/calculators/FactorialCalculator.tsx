'use client';

import { useState, useMemo } from 'react';

export default function FactorialCalculator() {
  const [number, setNumber] = useState('5');

  const results = useMemo(() => {
    const n = parseInt(number);

    if (isNaN(n)) return null;

    if (n < 0) {
      return { error: 'Factorials are not defined for negative numbers.', value: 0, n: 0 };
    }

    if (n > 170) {
      return { error: 'Number too large. Results over 170! exceed standard JavaScript infinity bounds.', value: 0, n: 0 };
    }

    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }

    return { value: result, error: null, n };
  }, [number]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-sm text-text-muted">
            Calculate the factorial of a non-negative integer. (e.g. 5! = 5 × 4 × 3 × 2 × 1 = 120)
          </p>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Enter a number</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2"
              placeholder="e.g. 5"
              min="0"
              max="170"
            />
          </div>
        </div>

        <div>
          {results ? (
            results.error ? (
              <div className="h-full flex items-center justify-center p-6 border border-dashed border-red-300 rounded-xl bg-red-50 text-red-700 text-center">
                {results.error}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-result-bg rounded-xl p-6 border border-success text-center flex flex-col items-center justify-center h-full">
                  <h3 className="text-lg font-semibold text-text-primary mb-6">Result</h3>
                  
                  <div className="flex items-center text-5xl font-mono font-bold text-text-muted mb-4">
                    {results.n}!
                  </div>

                  <div className="text-3xl font-bold text-text-muted mb-2">=</div>
                  
                  <div className="text-5xl md:text-6xl font-mono font-bold text-success break-all">
                    {results.value > 1e15 ? results.value.toExponential(4) : results.value.toLocaleString()}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter a number to calculate its factorial.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
