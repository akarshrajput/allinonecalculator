'use client';

import { useState, useMemo } from 'react';
import { calculateRetirement, RetirementInputs } from '@/lib/calculators/retirement';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [currentSavings, setCurrentSavings] = useState<string>('50000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [expectedReturn, setExpectedReturn] = useState<string>('7.0');
  const [inflationRate, setInflationRate] = useState<string>('2.5');

  const results = useMemo(() => {
    const inputs: RetirementInputs = {
      currentAge: parseInt(currentAge) || 0,
      retirementAge: parseInt(retirementAge) || 0,
      currentSavings: parseFloat(currentSavings) || 0,
      monthlyContribution: parseFloat(monthlyContribution) || 0,
      expectedReturnRate: parseFloat(expectedReturn) || 0,
      inflationRate: parseFloat(inflationRate) || 0,
    };

    if (inputs.currentAge >= inputs.retirementAge || inputs.currentAge <= 0) return null;
    return calculateRetirement(inputs);
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, inflationRate]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Retirement Age</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="w-full px-4 py-2"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Current Retirement Savings</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
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
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Expected Return</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="w-full pr-8 pl-4 py-2"
                />
                <span className="absolute right-3 top-2 text-text-muted">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Inflation Rate</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(e.target.value)}
                  className="w-full pr-8 pl-4 py-2"
                />
                <span className="absolute right-3 top-2 text-text-muted">%</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4 h-full flex flex-col justify-center">
              <div className="bg-result-bg rounded-xl p-6 border border-success">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Projected Savings at Age {retirementAge}</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  ${results.projectedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-text-muted">
                  Inflation Adjusted: ${results.inflationAdjustedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <ResultDisplay 
                  label="Estimated Monthly Income (4% Rule)" 
                  value={`$${results.monthlyIncomeInRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                  subValue="Before taxes. Not inflation adjusted."
                />
              </div>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Please enter valid ages to calculate your retirement projection.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Mastering Your Retirement Drawdown Strategy</h2>
        <p>
          Determining when you can stop working requires more than a simple savings goal. Eventually, you will need to switch from saving to spending. This tool sets your baseline, but you may also be searching for a <strong>retirement withdrawal calculator</strong> (or a <strong>retirement distribution calculator</strong> / <strong>retirement drawdown calculator</strong>) to figure out exact monthly payouts. Many users ask: <em>"<strong>how long will my retirement savings last calculator</strong>?"</em> or <em>"<strong>how long will my money last in retirement calculator</strong>?"</em> By adjusting your expected return and inflation rate, you can model scenarios to ensure you never run out of money. (Also searched as <strong>how long will retirement savings last calculator</strong>).
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Specialized & Federal Retirement Plans</h3>
        <p>
          Not everyone relies purely on a 401(k) or IRA. If you are a government employee or educator, you can use your expected pension payouts as part of your "Current Savings" or adjust the monthly contributions to reflect your specific plan. This tool is frequently used as a benchmark alongside your official:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 mb-6">
          <li><strong>trs retirement calculator</strong> (Teacher Retirement System)</li>
          <li><strong>teacher retirement calculator</strong></li>
          <li><strong>calstrs retirement calculator</strong> (California Educators)</li>
          <li><strong>psers retirement calculator</strong> (Pennsylvania Public Schools)</li>
          <li><strong>retirement calculator fers employees</strong></li>
          <li><strong>fers calculator retirement</strong> (or <strong>federal retirement calculator fers</strong>)</li>
          <li><strong>tsp retirement calculator</strong> (Thrift Savings Plan)</li>
          <li><strong>reserve retirement calculator</strong> (Military Reserves)</li>
        </ul>

        <h3 className="text-lg font-bold text-text-primary mt-6">Financial Advisor Frameworks & Taxes</h3>
        <p>
          When planning, you might follow specific financial gurus. If you are following the Baby Steps and need a <strong>dave ramsey retirement calculator</strong> (or <strong>retirement calculator dave ramsey</strong> / <strong>dave ramsey calculator retirement</strong>), this tool allows you to plug in his recommended 10% to 12% mutual fund growth rates. Prefer a traditional brokerage approach like an <strong>edward jones retirement calculator</strong> or an independent portal like the <strong>myusfinance retirement calculator</strong>? Our unbiased formulas give you the same institutional-grade math without the sales pitch.
        </p>
        <p>
          <em>Please note: The monthly income projected by the 4% rule is a gross figure. You will eventually need a specialized <strong>taxes on retirement income calculator</strong> to determine your net take-home pay, depending on whether your funds are in a traditional IRA (taxable) or a Roth IRA (tax-free).</em>
        </p>
      </div>
    </div>
  );
}
