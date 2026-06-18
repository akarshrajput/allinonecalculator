'use client';

import { useState, useMemo } from 'react';
import { calculateLoan, LoanInputs } from '@/lib/calculators/loan';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('20000');
  const [interestRate, setInterestRate] = useState<string>('5.5');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');
  const [loanType, setLoanType] = useState<string>('personal');

  const results = useMemo(() => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    let termMonths = parseInt(loanTerm) || 0;
    
    if (termUnit === 'years') {
      termMonths *= 12;
    }

    if (amount <= 0 || termMonths <= 0) return null;

    const inputs: LoanInputs = {
      loanAmount: amount,
      interestRate: rate,
      loanTermMonths: termMonths
    };

    return calculateLoan(inputs);
  }, [loanAmount, interestRate, loanTerm, termUnit]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4 overflow-x-auto whitespace-nowrap">
        {['personal', 'auto', 'student'].map(type => (
          <button
            key={type}
            onClick={() => setLoanType(type)}
            className={`font-semibold capitalize ${loanType === type ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
          >
            {type} Loan
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Loan Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
                placeholder="20000"
              />
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
                placeholder="5.5"
              />
              <span className="absolute right-3 top-2 text-text-muted">%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Loan Term</label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-2"
                placeholder="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Unit</label>
              <select
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value as 'years' | 'months')}
                className="w-full px-4 py-2"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4 h-full flex flex-col justify-center">
              <div className="bg-result-bg rounded-xl p-6 border border-success">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Monthly Payment</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  ${results.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ResultDisplay 
                  label="Total Principal" 
                  value={`$${(parseFloat(loanAmount) || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                />
                <ResultDisplay 
                  label="Total Interest" 
                  value={`$${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                />
              </div>

              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <span className="font-semibold text-text-primary">Total Cost of Loan</span>
                <span className="font-mono font-bold text-xl text-text-primary">
                  ${results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter loan amount and term to see results.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Advanced Loan Calculations & Scenarios</h2>
        <p>
          Whether you are looking for a standard personal loan or specialized financing, our tool handles it all. Use this calculator as your primary <strong>equipment loan calculator</strong> for business purchases, a <strong>farm loan calculator</strong> for agricultural investments, or even an <strong>sba loan payment calculator</strong>. For quick real estate flips, you can input your high-interest terms to use this as a <strong>bridge loan calculator</strong> or a <strong>hard money loan calculator</strong>.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Home, Auto & Specialized Lending</h3>
        <p>
          Need to finance a vehicle or a mobile property? This tool perfectly adapts as a <strong>mobile home loan calculator</strong> or a <strong>manufactured home loan calculator</strong>. If you are comparing your current vehicle payment against a new rate, simply use the "Auto" tab as a <strong>car loan calculator refinance</strong> tool. It works just like a dedicated <strong>car loan calculator suncoast</strong> or a standard <strong>credit union loan calculator</strong>.
        </p>
        <p>
          For real estate, this tool can estimate monthly costs for an <strong>arm loan calculator</strong> (Adjustable Rate Mortgage), a specialized <strong>maryland mortgage loan calculator</strong>, or give you a baseline <strong>reverse mortgage loan calculation</strong>. You can even simulate lump-sum principal paydowns by treating this as a <strong>loan recast calculator</strong>.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Personal Finance & Education</h3>
        <p>
          If you are managing student debt, use this tool as a <strong>parent plus loan calculator</strong> to see how much your monthly obligations will be. Borrowing against your retirement? It works perfectly as a <strong>tsp loan calculator</strong>. Many users who search for a <strong>myusfinance personal loan calculator</strong> (or <strong>myusfinance loan calculator</strong>) prefer our transparent, easy-to-use interface to act as their <strong>fico loan savings calculator</strong>—showing exactly how improving their credit score lowers their monthly interest rates over time.
        </p>
      </div>
    </div>
  );
}
