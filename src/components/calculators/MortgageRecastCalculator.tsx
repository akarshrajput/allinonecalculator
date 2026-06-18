'use client';

import { useState, useMemo } from 'react';
import { calculateMortgageRecast, MortgageRecastInputs } from '@/lib/calculators/mortgageRecast';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function MortgageRecastCalculator() {
  const [currentBalance, setCurrentBalance] = useState<string>('250000');
  const [currentPayment, setCurrentPayment] = useState<string>('1500');
  const [lumpSum, setLumpSum] = useState<string>('50000');
  const [remainingYears, setRemainingYears] = useState<string>('25');
  const [interestRate, setInterestRate] = useState<string>('5.5');

  const results = useMemo(() => {
    const inputs: MortgageRecastInputs = {
      currentBalance: parseFloat(currentBalance) || 0,
      currentPayment: parseFloat(currentPayment) || 0,
      lumpSumPayment: parseFloat(lumpSum) || 0,
      remainingTermMonths: (parseFloat(remainingYears) || 0) * 12,
      interestRate: parseFloat(interestRate) || 0,
    };

    if (inputs.currentBalance <= 0 || inputs.remainingTermMonths <= 0 || inputs.lumpSumPayment <= 0) return null;
    return calculateMortgageRecast(inputs);
  }, [currentBalance, currentPayment, lumpSum, remainingYears, interestRate]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Current Mortgage Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Current Monthly Payment (Principal & Interest Only)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={currentPayment}
                onChange={(e) => setCurrentPayment(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Lump Sum Payment</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={lumpSum}
                onChange={(e) => setLumpSum(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Remaining Term</label>
              <div className="relative">
                <input
                  type="number"
                  value={remainingYears}
                  onChange={(e) => setRemainingYears(e.target.value)}
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
        </div>

        <div>
          {results ? (
            <div className="space-y-4 h-full flex flex-col justify-center">
              <div className="bg-result-bg rounded-xl p-6 border border-success">
                <h3 className="text-lg font-semibold text-text-primary mb-2">New Monthly Payment</h3>
                <div className="flex items-baseline space-x-4">
                  <div className="text-4xl font-mono font-bold text-success mb-2">
                    ${results.newMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm font-medium text-text-muted line-through">
                    ${(parseFloat(currentPayment) || 0).toLocaleString()}
                  </div>
                </div>
                <p className="text-sm text-success font-medium">
                  You save ${results.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })} every month!
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <ResultDisplay 
                  label="Total Interest Saved" 
                  value={`$${results.interestSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                  highlight={true}
                />
              </div>

              <div className="mt-4 p-4 border border-border rounded-lg bg-surface">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-muted">Original Total Interest</span>
                  <span className="font-semibold text-text-primary">${results.totalInterestOriginal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-muted">New Total Interest</span>
                  <span className="font-semibold text-text-primary">${results.totalInterestNew.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your current balance, payment, and a lump sum to see your recast savings.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Understanding Mortgage Recasting</h2>
        <p>
          If you have recently received a windfall—like an inheritance, a work bonus, or proceeds from selling another property—you might be wondering how to lower your monthly expenses. Instead of refinancing at current market rates, you can use a <strong>mortgage recast calculator</strong> (sometimes searched as a <strong>recast mortgage calculator</strong> or <strong>mortgage loan recast calculator</strong>) to see exactly how applying a lump sum directly to your principal changes your monthly obligation.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Why Use a Recast Calculator?</h3>
        <p>
          Whether you call it a <strong>recasting mortgage calculator</strong>, a <strong>mortgage recasting calculator</strong>, or a <strong>recast calculator mortgage</strong>, the math remains the same. Your lender takes your new, lower principal balance and re-amortizes it over your remaining term. This is why using a dedicated <strong>mortgage recast calculator with amortization</strong> is so powerful: it shows you the exact drop in your <strong>mortgage recast payment calculator</strong> results without extending the life of your loan.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Ditching the Spreadsheets</h3>
        <p>
          Many homeowners try to build a <strong>mortgage recast calculator excel</strong> sheet to figure this out manually. We built this <strong>free mortgage recast calculator</strong> (also searched as <strong>mortgage recast calculator free</strong> or <strong>mortgage calculator recast</strong>) to save you the hassle. We believe this is the <strong>best mortgage recast calculator</strong> available because it instantly compares your original interest trajectory against your new trajectory in one click. 
        </p>
        <p>
          While you might look for a <strong>mortgage recast calculator bankrate</strong> tool, our independent interface guarantees complete privacy while <strong>recasting a mortgage calculator</strong> calculation. Simply plug in your <strong>recast mortgage payment calculator</strong> numbers above and see your savings immediately.
        </p>
      </div>
    </div>
  );
}
