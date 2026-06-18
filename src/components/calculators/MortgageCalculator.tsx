'use client';

import { useState, useMemo } from 'react';
import { calculateMortgage, MortgageInputs } from '@/lib/calculators/mortgage';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>('350000');
  const [downPaymentPct, setDownPaymentPct] = useState<string>('20');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [propertyTax, setPropertyTax] = useState<string>('4200');
  const [homeInsurance, setHomeInsurance] = useState<string>('1200');
  const [hoa, setHoa] = useState<string>('0');
  
  const downPaymentAmt = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const pct = parseFloat(downPaymentPct) || 0;
    return (price * pct) / 100;
  }, [homePrice, downPaymentPct]);

  const pmi = useMemo(() => {
    const pct = parseFloat(downPaymentPct) || 0;
    const price = parseFloat(homePrice) || 0;
    if (pct < 20) {
      // Rough estimate of PMI: 0.5% to 1% of the loan amount annually
      const loanAmount = price - downPaymentAmt;
      return (loanAmount * 0.0075) / 12; // 0.75% avg
    }
    return 0;
  }, [downPaymentPct, homePrice, downPaymentAmt]);

  const results = useMemo(() => {
    const inputs: MortgageInputs = {
      homePrice: parseFloat(homePrice) || 0,
      downPayment: downPaymentAmt,
      loanTermYears: parseInt(loanTerm) || 30,
      interestRate: parseFloat(interestRate) || 0,
      propertyTaxAnnual: parseFloat(propertyTax) || 0,
      homeInsuranceAnnual: parseFloat(homeInsurance) || 0,
      hoaMonthly: parseFloat(hoa) || 0,
      pmiMonthly: pmi
    };
    
    if (inputs.homePrice <= 0) return null;
    return calculateMortgage(inputs);
  }, [homePrice, downPaymentAmt, loanTerm, interestRate, propertyTax, homeInsurance, hoa, pmi]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Home Price</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Down Payment</label>
              <div className="relative">
                <input
                  type="number"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(e.target.value)}
                  className="w-full pr-8 pl-4 py-2"
                />
                <span className="absolute right-3 top-2 text-text-muted">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-text-muted">$</span>
                <input
                  type="number"
                  value={downPaymentAmt.toFixed(0)}
                  readOnly
                  className="w-full pl-8 pr-4 py-2 bg-gray-50 text-text-muted cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Loan Term</label>
              <div className="relative">
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-4 py-2"
                >
                  <option value="30">30 Years</option>
                  <option value="20">20 Years</option>
                  <option value="15">15 Years</option>
                  <option value="10">10 Years</option>
                </select>
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
            <label className="block text-sm font-medium text-text-muted mb-1">Property Tax (Annual)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Home Insurance (Annual)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-text-muted">$</span>
                <input
                  type="number"
                  value={homeInsurance}
                  onChange={(e) => setHomeInsurance(e.target.value)}
                  className="w-full pl-8 pr-4 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">HOA Fees (Monthly)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-text-muted">$</span>
                <input
                  type="number"
                  value={hoa}
                  onChange={(e) => setHoa(e.target.value)}
                  className="w-full pl-8 pr-4 py-2"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          {results && (
            <div className="bg-gray-50 rounded-xl p-6 border border-border h-full flex flex-col">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Estimated Monthly Payment</h3>
              <div className="text-4xl font-mono font-bold text-success mb-6">
                ${results.totalMonthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              
              <div className="space-y-3 flex-grow">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-sm text-text-muted flex items-center"><span className="w-3 h-3 rounded-full bg-accent mr-2"></span>Principal & Interest</span>
                  <span className="font-semibold text-text-primary">${results.monthlyPrincipalAndInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-sm text-text-muted flex items-center"><span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>Property Taxes</span>
                  <span className="font-semibold text-text-primary">${results.monthlyPropertyTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-sm text-text-muted flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>Home Insurance</span>
                  <span className="font-semibold text-text-primary">${results.monthlyHomeInsurance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                {results.monthlyHoa > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-sm text-text-muted flex items-center"><span className="w-3 h-3 rounded-full bg-gray-500 mr-2"></span>HOA Fees</span>
                    <span className="font-semibold text-text-primary">${results.monthlyHoa.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                )}
                {results.monthlyPmi > 0 && (
                  <div className="flex justify-between items-center pb-2 border-b border-border">
                    <span className="text-sm text-text-muted flex items-center"><span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>PMI</span>
                    <span className="font-semibold text-text-primary">${results.monthlyPmi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-muted">Total Loan Amount</span>
                  <span className="font-semibold text-text-primary">${results.totalPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Advanced Mortgage Calculations</h2>
        <p>
          Beyond standard principal and interest, this tool serves as a comprehensive <strong>mortgage insurance calculator</strong> to help you factor in PMI costs. Whether you're looking for a <strong>biweekly mortgage calculator</strong> strategy to pay down your loan faster, or exploring a <strong>dave ramsey mortgage calculator</strong> approach for aggressive debt freedom (such as the <strong>dave ramsey mortgage payoff calculator</strong> method), running your numbers accurately is step one.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Specialty Loans & Scenarios</h3>
        <p>
          This flexible tool can be used as a <strong>manufactured home mortgage calculator</strong> or a <strong>mobile home mortgage calculator</strong> by adjusting the interest rate and term to match chattel or personal property loans. If you are a senior homeowner, you may also be looking for a <strong>reverse mortgage calculator</strong>. If you want to <strong>calculate reverse mortgage</strong> payouts privately, we offer a dedicated <strong>reverse mortgage calculator without personal information</strong> on our site.
        </p>
        <p>
          Additionally, if you've recently come into a lump sum of cash, you might be searching for a <strong>mortgage recast calculator</strong> (or <strong>recast mortgage calculator</strong>) to see how paying down your principal lowers your monthly bill without refinancing.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">State-Specific Estimates</h3>
        <p>
          Property taxes and insurance rates vary wildly by location. We recommend adjusting the tax fields manually depending on your state. This tool is frequently used as a:
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 mb-6">
          <li><strong>mortgage calculator nc</strong> (North Carolina)</li>
          <li><strong>mortgage calculator colorado</strong></li>
          <li><strong>mortgage calculator ga</strong> (Georgia)</li>
          <li><strong>mortgage calculator ma</strong> (Massachusetts)</li>
          <li><strong>mortgage calculator oregon</strong></li>
          <li><strong>mortgage calculator sc</strong> (South Carolina)</li>
          <li><strong>mortgage calculator wi</strong> (Wisconsin)</li>
          <li><strong>mortgage calculator ct</strong> (Connecticut)</li>
          <li><strong>mortgage calculator georgia</strong></li>
          <li><strong>mortgage calculator idaho</strong></li>
          <li><strong>mortgage calculator oklahoma</strong></li>
          <li><strong>mortgage calculator wisconsin</strong></li>
          <li><strong>mortgage calculator alabama</strong></li>
          <li><strong>mortgage calculator arkansas</strong></li>
          <li><strong>mortgage calculator washington state</strong></li>
        </ul>
        
        <p>
          <em>Note: While some use <strong>mortgage calculator games</strong> or the <strong>mortgage calculator ramsey</strong> (or <strong>mortgage calculator dave ramsey</strong>) tools for basic estimates, our calculator provides an all-in-one view including taxes, insurance, and HOA fees for the most realistic monthly payment possible.</em>
        </p>
      </div>
    </div>
  );
}
