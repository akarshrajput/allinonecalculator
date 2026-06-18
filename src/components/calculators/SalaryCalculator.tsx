'use client';

import { useState, useMemo } from 'react';
import { calculateSalary, SalaryInputs } from '@/lib/calculators/salary';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function SalaryCalculator() {
  const [salary, setSalary] = useState<string>('75000');
  const [state, setState] = useState<string>('CA');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head'>('single');
  const [preTaxDeductions, setPreTaxDeductions] = useState<string>('5000'); // 401k, health

  const results = useMemo(() => {
    const inputs: SalaryInputs = {
      annualSalary: parseFloat(salary) || 0,
      state,
      filingStatus,
      preTaxDeductions: parseFloat(preTaxDeductions) || 0,
    };

    if (inputs.annualSalary <= 0) return null;
    return calculateSalary(inputs);
  }, [salary, state, filingStatus, preTaxDeductions]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Annual Salary</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">State</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2"
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas (No Tax)</option>
                <option value="FL">Florida (No Tax)</option>
                <option value="WA">Washington (No Tax)</option>
                <option value="IL">Illinois</option>
                {/* More states would go here */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Filing Status</label>
              <select
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as any)}
                className="w-full px-4 py-2"
              >
                <option value="single">Single</option>
                <option value="married">Married (Joint)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Pre-Tax Deductions (401k, Health)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={preTaxDeductions}
                onChange={(e) => setPreTaxDeductions(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Net Take-Home Pay</h3>
                <div className="text-4xl font-mono font-bold text-success">
                  ${results.netAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-sans text-text-muted font-medium">/ year</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-surface border border-border rounded-lg text-center">
                  <div className="text-xs text-text-muted mb-1">Monthly</div>
                  <div className="font-mono font-bold">${results.netMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="p-3 bg-surface border border-border rounded-lg text-center">
                  <div className="text-xs text-text-muted mb-1">Bi-Weekly</div>
                  <div className="font-mono font-bold">${results.netBiWeekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
                <div className="p-3 bg-surface border border-border rounded-lg text-center">
                  <div className="text-xs text-text-muted mb-1">Weekly</div>
                  <div className="font-mono font-bold">${results.netWeekly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                </div>
              </div>

              <div className="mt-4 p-4 border border-border rounded-lg bg-surface">
                <h4 className="font-semibold text-text-primary mb-4 border-b border-border pb-2">Tax Breakdown (Estimated)</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">Federal Tax</span>
                    <span className="font-semibold text-text-primary">-${results.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">State Tax</span>
                    <span className="font-semibold text-text-primary">-${results.stateTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-text-muted">FICA (SS & Medicare)</span>
                    <span className="font-semibold text-text-primary">-${results.ficaTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
                    <span className="text-sm font-medium text-text-muted">Effective Tax Rate</span>
                    <span className="font-semibold text-text-primary">{results.effectiveTaxRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your salary details to see your take-home pay.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Mastering Your Take-Home Pay</h2>
        <p>
          Before accepting a job offer or asking for a promotion, it is critical to know exactly how much money will hit your bank account. Our tool acts as a dedicated <strong>salary raise calculator</strong> (or <strong>salary increase calculator</strong>). Simply enter your new expected gross pay, and instantly see the real-world difference in your bi-weekly checks. If you run a small business, you can also use this tool when <strong>calculating salaries payable</strong> to ensure you hold back the correct amount for state and federal tax liabilities. (Architects and designers may also use this as an <strong>aia salary calculator</strong> benchmark).
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">State-by-State Tax Differences</h3>
        <p>
          Because there is no federal flat tax, where you live determines what you keep. States with no income tax—like Texas and Washington—are incredibly popular right now. By toggling the dropdown, you can instantly turn this into a <strong>salary calculator texas</strong> (or <strong>texas salary calculator</strong>) or a <strong>washington salary calculator</strong> (also searched as <strong>salary calculator washington</strong>) to see how much you save by avoiding state income taxes.
        </p>
        
        <p className="mt-4 mb-2">Conversely, high-tax and flat-tax states require precise planning. Our users frequently rely on this tool as their exact:</p>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mt-2 mb-6">
          <li><strong>new york salary calculator</strong></li>
          <li><strong>salary calculator illinois</strong> (or <strong>illinois salary calculator</strong>)</li>
          <li><strong>nj salary calculator</strong> (or <strong>new jersey salary calculator</strong>)</li>
          <li><strong>salary calculator michigan</strong> (or <strong>michigan salary calculator</strong>)</li>
          <li><strong>salary calculator ohio</strong></li>
          <li><strong>salary calculator pa</strong> (Pennsylvania)</li>
          <li><strong>salary calculator colorado</strong></li>
        </ul>

        <h3 className="text-lg font-bold text-text-primary mt-6">The Southeast & Mid-Atlantic</h3>
        <p>
          If you are relocating to the growing tech and business hubs of the South or East Coast, state tax brackets vary wildly. Toggle the state selector to use this as a <strong>georgia salary calculator</strong> (also <strong>salary calculator georgia</strong>) or an <strong>nc salary calculator</strong> (which you might search as <strong>salary calculator north carolina</strong> or <strong>north carolina salary calculator</strong>). Moving to the DMV area? We accurately calculate the nuances required for a <strong>virginia salary calculator</strong> (or <strong>salary calculator va</strong>) and a <strong>maryland salary calculator</strong>.
        </p>
      </div>
    </div>
  );
}
