'use client';

import { useState, useMemo } from 'react';

export default function CapRateCalculator() {
  const [propertyValue, setPropertyValue] = useState('500000');
  
  // Income
  const [monthlyRent, setMonthlyRent] = useState('4500');
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState('150');

  // Expenses (Yearly)
  const [propertyTaxes, setPropertyTaxes] = useState('6000');
  const [insurance, setInsurance] = useState('1200');
  const [maintenance, setMaintenance] = useState('2500');
  const [propertyManagement, setPropertyManagement] = useState('4000');
  const [vacancyRate, setVacancyRate] = useState('5'); // percentage

  const results = useMemo(() => {
    const pValue = parseFloat(propertyValue);
    if (isNaN(pValue) || pValue <= 0) return null;

    // Gross Operating Income (GOI)
    const mRent = parseFloat(monthlyRent) || 0;
    const mOther = parseFloat(otherMonthlyIncome) || 0;
    const annualPotentialIncome = (mRent + mOther) * 12;

    const vRate = parseFloat(vacancyRate) || 0;
    const vacancyLoss = annualPotentialIncome * (vRate / 100);

    const grossOperatingIncome = annualPotentialIncome - vacancyLoss;

    // Operating Expenses
    const tTaxes = parseFloat(propertyTaxes) || 0;
    const tIns = parseFloat(insurance) || 0;
    const tMaint = parseFloat(maintenance) || 0;
    const tMgmt = parseFloat(propertyManagement) || 0;

    const totalOperatingExpenses = tTaxes + tIns + tMaint + tMgmt;

    // Net Operating Income (NOI)
    const netOperatingIncome = grossOperatingIncome - totalOperatingExpenses;

    // Capitalization Rate
    const capRate = (netOperatingIncome / pValue) * 100;

    return {
      grossOperatingIncome,
      totalOperatingExpenses,
      netOperatingIncome,
      capRate
    };
  }, [propertyValue, monthlyRent, otherMonthlyIncome, propertyTaxes, insurance, maintenance, propertyManagement, vacancyRate]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Current Property Value / Purchase Price</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <div className="px-4 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
              <input type="number" value={propertyValue} onChange={(e) => setPropertyValue(e.target.value)} className="w-full px-4 py-2 outline-none" />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-text-primary mb-4">Income (Monthly)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Total Rent</label>
                <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                  <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                  <input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="w-full px-3 py-2 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Other Income</label>
                <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                  <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                  <input type="number" value={otherMonthlyIncome} onChange={(e) => setOtherMonthlyIncome(e.target.value)} className="w-full px-3 py-2 outline-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="font-semibold text-text-primary mb-4">Expenses (Yearly)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Property Taxes</label>
                <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                  <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                  <input type="number" value={propertyTaxes} onChange={(e) => setPropertyTaxes(e.target.value)} className="w-full px-3 py-2 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Insurance</label>
                <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                  <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                  <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="w-full px-3 py-2 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Maintenance</label>
                <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                  <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                  <input type="number" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} className="w-full px-3 py-2 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Property Mgmt</label>
                <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                  <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                  <input type="number" value={propertyManagement} onChange={(e) => setPropertyManagement(e.target.value)} className="w-full px-3 py-2 outline-none" />
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-text-muted mb-1">Vacancy Rate (%)</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <input type="number" value={vacancyRate} onChange={(e) => setVacancyRate(e.target.value)} className="w-full px-4 py-2 outline-none" />
                <div className="px-4 py-2 bg-gray-50 border-l border-border text-text-muted">%</div>
              </div>
              <p className="text-xs text-text-muted mt-1">Estimates lost income from unrented periods.</p>
            </div>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Capitalization Rate</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  {results.capRate.toFixed(2)}%
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Higher cap rates generally indicate higher returns but higher risk. Good cap rates usually fall between 4% and 10%.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-surface border border-border rounded-lg">
                  <span className="text-sm font-medium text-text-muted">Net Operating Income (NOI)</span>
                  <span className="font-mono font-semibold text-lg text-text-primary">
                    ${results.netOperatingIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / yr
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 border border-border rounded-lg">
                  <span className="text-sm text-text-muted">Gross Operating Income</span>
                  <span className="font-mono text-text-primary">
                    ${results.grossOperatingIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 border border-border rounded-lg">
                  <span className="text-sm text-text-muted">Total Operating Expenses</span>
                  <span className="font-mono text-text-primary">
                    ${results.totalOperatingExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <strong>Note:</strong> Cap rate calculations do <em>not</em> include mortgage payments (debt service). It evaluates the property purely on its ability to generate income.
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter property value, income, and expenses to calculate your Cap Rate and Net Operating Income (NOI).
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Understanding Commercial Real Estate Math</h2>
        <p>
          Whether you are evaluating a duplex or a massive multi-family complex, understanding <strong>how is cap rate calculated</strong> is essential for success. Instead of asking yourself <em>"<strong>how do you calculate cap rate</strong> manually?"</em>, our tool automatically handles the complex <strong>cap rate calculation</strong> for you. By instantly deducting expenses from gross rent, this <strong>cap rate calculator</strong> guarantees an accurate read on your Net Operating Income (NOI).
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">How to Calculate a Cap Rate</h3>
        <p>
          If you want to know <strong>how to calculate a cap rate</strong> on your own, the formula is simply NOI divided by the current property value. However, manually <strong>calculating cap rate</strong> (or using a basic <strong>calculate cap rate calculator</strong>) leaves room for error when tallying vacancy losses or property management fees. 
        </p>
        <p>
          Using a dedicated <strong>cap rate calculator real estate</strong> platform ensures all variables are captured. Simply plug in your data to <strong>calculate cap rate</strong> instantly without fumbling with spreadsheets.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Institutional Rate Caps vs Real Estate Cap Rates</h3>
        <p>
          It is important to distinguish between a real estate capitalization rate and an interest rate cap on commercial debt. If you are looking for a <strong>chatham interest rate cap calculator</strong> (or a <strong>chatham rate cap calculator</strong>), you are likely a sponsor trying to hedge floating-rate commercial loans against SOFR increases. While an institutional <strong>rate cap calculator</strong> predicts hedging costs, the tool on this page is specifically designed for analyzing real estate equity yield. If you are a syndicator, learning <strong>how to calculate cap rates</strong> correctly will help you pitch accurate pro forma yields to your limited partners.
        </p>
      </div>
    </div>
  );
}
