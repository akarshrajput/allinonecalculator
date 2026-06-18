'use client';

import { useState, useMemo } from 'react';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function RootCalculator() {
  const [base, setBase] = useState('16');
  const [root, setRoot] = useState('2');

  const results = useMemo(() => {
    const x = parseFloat(base);
    const n = parseFloat(root);

    if (isNaN(x) || isNaN(n)) return null;

    // Handle negative bases for even roots
    if (x < 0 && n % 2 === 0) {
      return { error: 'Even roots of negative numbers result in complex/imaginary numbers.', value: 0 };
    }

    // Nth root is equivalent to x ^ (1/n)
    let answer = 0;
    if (x < 0) {
      // For odd roots of negative numbers, extract the negative sign, root the absolute value, then reapply sign
      answer = -Math.pow(Math.abs(x), 1 / n);
    } else {
      answer = Math.pow(x, 1 / n);
    }

    return { value: answer, error: null };
  }, [base, root]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-sm text-text-muted">
            Calculate the n-th root of any number. For a square root, enter 2. For a cube root, enter 3.
          </p>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Number (Base)</label>
            <input
              type="number"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full px-4 py-2"
              placeholder="e.g. 16"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Root (n)</label>
            <input
              type="number"
              value={root}
              onChange={(e) => setRoot(e.target.value)}
              className="w-full px-4 py-2"
              placeholder="e.g. 2"
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
                  
                  <div className="flex items-center text-3xl font-mono text-text-muted mb-4">
                    <sup className="text-xl -mt-4 mr-1">{root}</sup>
                    <span className="text-5xl border-t-2 border-text-muted pl-1">√</span>
                    <span className="border-t-2 border-text-muted pt-1 px-1">{base}</span>
                  </div>

                  <div className="text-3xl font-bold text-text-muted mb-2">=</div>
                  
                  <div className="text-5xl font-mono font-bold text-success break-all">
                    {Number.isInteger(results.value) ? results.value : results.value.toFixed(6)}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter a number and a root to calculate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
