'use client';

import { useState, useMemo } from 'react';
import { calculateReverseMortgage } from '@/lib/calculators/reverseMortgage';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function ReverseMortgageCalculator() {
  const [homeValue, setHomeValue] = useState<string>('400000');
  const [age, setAge] = useState<string>('65');
  const [existingMortgage, setExistingMortgage] = useState<string>('50000');
  const [interestRate, setInterestRate] = useState<string>('7.0');

  const results = useMemo(() => {
    const inputs = {
      homeValue: parseFloat(homeValue) || 0,
      age: parseInt(age) || 0,
      existingMortgageBalance: parseFloat(existingMortgage) || 0,
      expectedInterestRate: parseFloat(interestRate) || 0,
    };

    if (inputs.homeValue <= 0 || inputs.age <= 0) return null;
    return calculateReverseMortgage(inputs);
  }, [homeValue, age, existingMortgage, interestRate]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Age of Youngest Borrower</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2"
              placeholder="e.g. 65"
            />
            {parseInt(age) < 62 && parseInt(age) > 0 && (
              <p className="text-red-500 text-xs mt-1">You must be at least 62 years old to be eligible for a reverse mortgage.</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Estimated Home Value</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={homeValue}
                onChange={(e) => setHomeValue(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Current Mortgage Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={existingMortgage}
                onChange={(e) => setExistingMortgage(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Expected Interest Rate</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-4 pr-8 py-2"
              />
              <span className="absolute right-3 top-2 text-text-muted">%</span>
            </div>
            <p className="text-xs text-text-muted mt-1">Rates fluctuate. 7% is a typical estimate.</p>
          </div>
        </div>

        <div>
          {results && results.isEligible ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Estimated Available Funds</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  ${results.availableFunds.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-text-muted">
                  After paying off your current mortgage of ${parseFloat(existingMortgage).toLocaleString()}.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <ResultDisplay 
                  label="Monthly Payout Option (Tenure)" 
                  value={`$${results.monthlyPayoutOption.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo`} 
                />
                <ResultDisplay 
                  label="Lump Sum Option (First Year Limit)" 
                  value={`$${results.lumpSumOption.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                />
                <ResultDisplay 
                  label="Line of Credit Option" 
                  value={`$${results.lineOfCreditOption.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                />
              </div>
            </div>
          ) : results && !results.isEligible ? (
             <div className="h-full flex items-center justify-center p-6 border border-dashed border-red-300 rounded-xl bg-red-50 text-red-700 text-center">
              Eligibility Requirement: The youngest borrower must be at least 62 years old to qualify for a HECM reverse mortgage.
            </div>
          ) : null}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Calculate Your Reverse Mortgage Options Safely</h2>
        <p>
          We believe in privacy. That's why we created this completely <strong>free reverse mortgage calculator</strong> as a truly secure <strong>reverse mortgage calculator without personal information</strong> (or <strong>reverse mortgage calculator no personal info</strong>). <strong>Calculating reverse mortgage</strong> payouts shouldn't require giving away your phone number to salespeople. Here, you can <strong>calculate reverse mortgage</strong> estimates instantly and anonymously.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Comprehensive Reverse Mortgage Loan Calculation</h3>
        <p>
          Whether you are looking for a standard <strong>fha reverse mortgage calculator</strong> (which follows standard HECM guidelines) or a proprietary <strong>jumbo reverse mortgage calculator</strong> for high-value properties, this <strong>calculator for reverse mortgage</strong> helps you establish a baseline. You can use it as a <strong>reverse mortgage loan calculator</strong> (also searched as a <strong>mortgage reverse calculator</strong> or <strong>mortgage calculator reverse</strong>) to understand how much home equity you can convert into cash.
        </p>
        
        <p>
          If you are considering moving, this tool can also function as a <strong>reverse mortgage purchase calculator</strong>. The HECM for Purchase program allows seniors to buy a new home and obtain a reverse mortgage within a single transaction. While a specialized <strong>reverse mortgage purchase down payment calculator</strong> can be used for exact transaction fees, you can use our <strong>calculator reverse mortgage</strong> logic to estimate the principal limit you'd qualify for on the new property. 
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Understanding Payouts & Amortization</h3>
        <p>
          Unlike traditional loans, a reverse mortgage doesn't require monthly payments. However, interest still accrues. Because of this, many users search for a <strong>reverse mortgage amortization calculator</strong> or a <strong>reverse mortgage payment calculator</strong> to understand how their loan balance grows over time. While this specific tool gives you the upfront <strong>reverse mortgage loan calculation</strong>, understanding the long-term impact on your estate is just as important when deciding to <strong>calculate a reverse mortgage</strong>. Compare different <strong>reverse mortgages calculators</strong> to get a well-rounded financial picture.
        </p>
      </div>
    </div>
  );
}
