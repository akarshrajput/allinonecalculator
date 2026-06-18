'use client';

import { useState, useMemo } from 'react';

export default function AutoLoanRefinanceCalculator() {
  // Current Loan
  const [currentBalance, setCurrentBalance] = useState('15000');
  const [currentRate, setCurrentRate] = useState('7.5');
  const [currentRemainingMonths, setCurrentRemainingMonths] = useState('48');

  // New Loan
  const [newRate, setNewRate] = useState('4.5');
  const [newMonths, setNewMonths] = useState('48');

  const results = useMemo(() => {
    const balance = parseFloat(currentBalance);
    const cRate = parseFloat(currentRate) / 100 / 12; // monthly rate
    const cMonths = parseInt(currentRemainingMonths);
    
    const nRate = parseFloat(newRate) / 100 / 12;
    const nMonths = parseInt(newMonths);

    if (isNaN(balance) || isNaN(cRate) || isNaN(cMonths) || isNaN(nRate) || isNaN(nMonths) || balance <= 0) return null;

    // Calculate Current Monthly Payment
    let currentPayment = 0;
    if (cRate === 0) {
      currentPayment = balance / cMonths;
    } else {
      currentPayment = balance * (cRate * Math.pow(1 + cRate, cMonths)) / (Math.pow(1 + cRate, cMonths) - 1);
    }
    const currentTotalInterest = (currentPayment * cMonths) - balance;

    // Calculate New Monthly Payment
    let newPayment = 0;
    if (nRate === 0) {
      newPayment = balance / nMonths;
    } else {
      newPayment = balance * (nRate * Math.pow(1 + nRate, nMonths)) / (Math.pow(1 + nRate, nMonths) - 1);
    }
    const newTotalInterest = (newPayment * nMonths) - balance;

    // Savings
    const monthlySavings = currentPayment - newPayment;
    const totalInterestSavings = currentTotalInterest - newTotalInterest;

    return {
      currentPayment,
      currentTotalInterest,
      newPayment,
      newTotalInterest,
      monthlySavings,
      totalInterestSavings,
      newMonths: nMonths
    };
  }, [currentBalance, currentRate, currentRemainingMonths, newRate, newMonths]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Current Loan Section */}
          <section>
            <h4 className="font-semibold text-text-primary border-b border-border pb-2 mb-4">Current Auto Loan</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Current Payoff Balance ($)</label>
                <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Interest Rate (%)</label>
                  <input type="number" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Months Remaining</label>
                  <input type="number" value={currentRemainingMonths} onChange={(e) => setCurrentRemainingMonths(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
                </div>
              </div>
            </div>
          </section>

          {/* New Loan Section */}
          <section>
            <h4 className="font-semibold text-text-primary border-b border-border pb-2 mb-4">Proposed Refinance Loan</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">New Interest Rate (%)</label>
                <input type="number" step="0.1" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">New Term (Months)</label>
                <select value={newMonths} onChange={(e) => setNewMonths(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg">
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="48">48 Months</option>
                  <option value="60">60 Months</option>
                  <option value="72">72 Months</option>
                  <option value="84">84 Months</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Total Interest Savings</h3>
                <div className={`text-4xl font-mono font-bold mb-2 ${results.totalInterestSavings > 0 ? 'text-success' : 'text-red-500'}`}>
                  ${results.totalInterestSavings > 0 ? results.totalInterestSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  {results.totalInterestSavings < 0 ? "This refinance will cost you more in interest over time." : "Money saved over the life of the new loan."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg">
                  <div className="text-sm text-text-muted mb-3 font-semibold border-b border-border pb-1">Monthly Payment</div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-text-muted">Current:</span>
                    <span className="font-mono text-text-primary">${results.currentPayment.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-text-muted">New:</span>
                    <span className="font-mono text-success font-semibold">${results.newPayment.toFixed(2)}</span>
                  </div>
                  <div className={`text-xs font-medium pt-2 border-t border-border ${results.monthlySavings > 0 ? 'text-success' : 'text-red-500'}`}>
                    {results.monthlySavings > 0 ? `Saves $${results.monthlySavings.toFixed(2)}/mo` : `Costs $${Math.abs(results.monthlySavings).toFixed(2)} more/mo`}
                  </div>
                </div>

                <div className="p-4 bg-surface border border-border rounded-lg">
                  <div className="text-sm text-text-muted mb-3 font-semibold border-b border-border pb-1">Total Interest Paid</div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-text-muted">Current:</span>
                    <span className="font-mono text-text-primary">${results.currentTotalInterest.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-text-muted">New:</span>
                    <span className="font-mono text-success font-semibold">${results.newTotalInterest.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {results.newMonths > parseInt(currentRemainingMonths) && results.monthlySavings > 0 && results.totalInterestSavings < 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                  <strong>Warning:</strong> While your monthly payment decreases by extending the loan term, you will end up paying <strong>${Math.abs(results.totalInterestSavings).toFixed(2)} more</strong> in total interest overall.
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your current loan details and proposed new loan details to see your savings.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">How to Maximize Your Vehicle Savings</h2>
        <p>
          Interest rates on vehicle financing change constantly. By using a <strong>refinance auto loan calculator</strong> (or <strong>auto refinance loan calculator</strong> / <strong>refinance calculator auto loan</strong>), you can easily determine if refinancing makes financial sense. Instead of guessing, this <strong>loan refinance calculator auto</strong> tool provides an exact <strong>auto loan refinance calculator comparison</strong> between your current trajectory and your new potential loan.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Optimizing for Credit & Equity</h3>
        <p>
          Before heading to the bank, you need an <strong>auto loan refinance savings calculator</strong> that accounts for your specific situation. Did your credit score improve since you originally bought the car? If so, you are likely looking for an <strong>auto loan refinance calculator with credit score</strong> adjustments in mind—meaning you can confidently input a much lower expected APR into our <strong>auto loan refinance rates calculator</strong> (also searched as <strong>auto loan refinance rate calculator</strong>). 
        </p>
        <p>
          Have extra cash on hand? By using the "New Loan Amount" field, this tool doubles as an <strong>auto loan refinance calculator with down payment</strong>. Just subtract your down payment from your current payoff balance, and see how much the <strong>auto loan refinance payment calculator</strong> drops your monthly bill.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Finding the Best Financing Strategy</h3>
        <p>
          Many of the <strong>best refinance auto loans calculator</strong> strategies involve looking outside of traditional dealerships. For example, comparing terms using a dedicated <strong>auto loan refinance calculator credit union</strong> (or <strong>credit union refinance auto loan calculator</strong>) often yields significantly better interest rates. 
        </p>
        <p>
          No matter how you search for it—whether you type "<strong>auto car loan refinance calculator</strong>", "<strong>refinance my auto loan calculator</strong>", "<strong>calculator auto loan refinance</strong>", "<strong>auto loans refinance calculator</strong>", "<strong>loan calculator auto refinance</strong>", or even just "<strong>auto calculator loan refinance</strong>"—the math remains identical. Test different rates across various <strong>auto loan refinance calculators</strong> (or <strong>refinance loan calculator auto</strong> tools) to guarantee you get the best deal before signing the paperwork.
        </p>
      </div>
    </div>
  );
}
