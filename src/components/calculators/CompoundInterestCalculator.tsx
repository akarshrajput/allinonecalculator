'use client';

import { useState, useMemo } from 'react';
import { calculateCompoundInterest, CompoundInterestInputs } from '@/lib/calculators/compoundInterest';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('7.0');
  const [years, setYears] = useState<string>('10');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('200');
  const [frequency, setFrequency] = useState<'monthly' | 'annually' | 'daily' | 'quarterly'>('monthly');

  const results = useMemo(() => {
    const inputs: CompoundInterestInputs = {
      principal: parseFloat(principal) || 0,
      annualInterestRate: parseFloat(interestRate) || 0,
      timePeriodYears: parseInt(years) || 0,
      monthlyContribution: parseFloat(monthlyContribution) || 0,
      compoundFrequency: frequency
    };

    if (inputs.timePeriodYears <= 0 || inputs.annualInterestRate < 0) return null;
    return calculateCompoundInterest(inputs);
  }, [principal, interestRate, years, monthlyContribution, frequency]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Initial Principal</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
                placeholder="10000"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Monthly Contribution</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
                placeholder="200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Time Period</label>
              <div className="relative">
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full pr-12 pl-4 py-2"
                />
                <span className="absolute right-3 top-2 text-text-muted">Years</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Interest Rate</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full pr-8 pl-4 py-2"
                />
                <span className="absolute right-3 top-2 text-text-muted">%</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Compound Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
              className="w-full px-4 py-2"
            >
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
              <option value="quarterly">Quarterly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4 h-full flex flex-col justify-center">
              <div className="bg-result-bg rounded-xl p-6 border border-success">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Final Amount</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  ${results.finalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <ResultDisplay 
                  label="Total Interest Earned" 
                  value={`$${results.totalInterestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                />
              </div>

              <div className="mt-4 p-4 border border-border rounded-lg bg-surface space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-muted">Initial Principal</span>
                  <span className="font-semibold text-text-primary">${results.totalPrincipal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-muted">Total Contributions</span>
                  <span className="font-semibold text-text-primary">${results.totalContributions.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter principal, rate, and time to see the magic of compound interest.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">The Magic of Compound Growth</h2>
        <p>
          Einstein reportedly called compound interest the eighth wonder of the world. But you don't need to know <strong>how to calculate compound interest in excel</strong> to harness its power. Instead of struggling to build a <strong>compound interest calculator excel</strong> spreadsheet (or trying to write formulas to make <strong>excel calculate compound interest</strong>), our dynamic tool does the heavy lifting instantly.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Financial Guru Methodologies</h3>
        <p>
          Are you following a specific wealth-building program? If you are a fan of the Baby Steps, this tool works perfectly as a <strong>dave ramsey compound interest calculator</strong> (or <strong>ramsey compound interest calculator</strong>). Just plug in his recommended 10-12% growth rate. If you follow the Financial Order of Operations, you can also use this as your primary <strong>money guy compound interest calculator</strong> to project your Wealth Multiplier at any age.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Modeling Advanced Scenarios</h3>
        <p>
          Depending on your investment strategy, you can use this interface in several flexible ways:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-6">
          <li>
            <strong>Banking & Fixed Income:</strong> By adjusting the frequency to "Daily" or "Monthly" and setting a lower interest rate, this acts as a precision <strong>cd compound interest calculator</strong> (or <strong>certificate of deposit compound interest calculator</strong>).
          </li>
          <li>
            <strong>Stocks & Equities:</strong> If you reinvest your quarterly or annual payouts, you can use this as a <strong>dividend compound interest calculator</strong>. 
          </li>
          <li>
            <strong>Dynamic Contributions:</strong> While this interface calculates a fixed monthly addition, many users treat it as a proxy <strong>compound interest calculator with increasing contributions</strong> by running multiple 5-year periods back-to-back. Conversely, entering a negative monthly contribution lets you use it as a <strong>compound interest calculator with withdrawals</strong> to model retirement spend-down phases.
          </li>
        </ul>
      </div>
    </div>
  );
}
