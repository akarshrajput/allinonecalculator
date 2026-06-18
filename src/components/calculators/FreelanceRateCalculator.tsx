'use client';

import { useState, useMemo } from 'react';

export default function FreelanceRateCalculator() {
  const [desiredAnnualSalary, setDesiredAnnualSalary] = useState('75000');
  
  // Expenses
  const [businessExpenses, setBusinessExpenses] = useState('5000'); // yearly
  const [taxRate, setTaxRate] = useState('30'); // percentage
  
  // Time
  const [weeksOff, setWeeksOff] = useState('4'); // vacations/sick time
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [billablePercentage, setBillablePercentage] = useState('60'); // percentage of time actually billed

  const results = useMemo(() => {
    const targetSalary = parseFloat(desiredAnnualSalary);
    if (isNaN(targetSalary) || targetSalary <= 0) return null;

    const expenses = parseFloat(businessExpenses) || 0;
    const taxes = parseFloat(taxRate) || 0;
    
    // Total Revenue Needed = (Target Salary + Expenses) / (1 - Tax Rate)
    // Wait, let's do: Taxes are calculated on (Revenue - Expenses).
    // Target Salary = (Revenue - Expenses) * (1 - Tax Rate)
    // Target Salary / (1 - Tax Rate) = Revenue - Expenses
    // Revenue = (Target Salary / (1 - Tax Rate)) + Expenses
    const requiredRevenue = (targetSalary / (1 - (taxes / 100))) + expenses;

    // Time calculations
    const wOff = parseFloat(weeksOff) || 0;
    const workingWeeks = 52 - wOff;
    if (workingWeeks <= 0) return null;

    const hPerWeek = parseFloat(hoursPerWeek) || 0;
    const totalWorkingHours = workingWeeks * hPerWeek;

    const bPercentage = parseFloat(billablePercentage) || 0;
    const billableHours = totalWorkingHours * (bPercentage / 100);

    if (billableHours <= 0) return null;

    const hourlyRate = requiredRevenue / billableHours;

    return {
      requiredRevenue,
      totalWorkingHours,
      billableHours,
      hourlyRate,
      taxesPaid: requiredRevenue - expenses - targetSalary
    };
  }, [desiredAnnualSalary, businessExpenses, taxRate, weeksOff, hoursPerWeek, billablePercentage]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <h4 className="font-semibold text-text-primary border-b border-border pb-2">1. Income & Expenses</h4>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Target Annual Take-Home Pay</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <div className="px-4 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
              <input type="number" value={desiredAnnualSalary} onChange={(e) => setDesiredAnnualSalary(e.target.value)} className="w-full px-4 py-2 outline-none" />
            </div>
            <p className="text-xs text-text-muted mt-1">How much you want to pocket after business expenses and taxes.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Annual Expenses</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                <input type="number" value={businessExpenses} onChange={(e) => setBusinessExpenses(e.target.value)} className="w-full px-3 py-2 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Tax Rate (%)</label>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
            </div>
          </div>

          <h4 className="font-semibold text-text-primary border-b border-border pb-2 mt-8">2. Your Time</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Weeks Off Per Year</label>
              <input type="number" value={weeksOff} onChange={(e) => setWeeksOff(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Work Hours / Week</label>
              <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Billable Time (%)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input type="number" value={billablePercentage} onChange={(e) => setBillablePercentage(e.target.value)} className="w-full px-4 py-2 outline-none" />
              <div className="px-4 py-2 bg-gray-50 border-l border-border text-text-muted">%</div>
            </div>
            <p className="text-xs text-text-muted mt-1">Percent of time spent doing client work (not admin/marketing).</p>
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Minimum Hourly Rate</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  ${results.hourlyRate.toFixed(2)} <span className="text-lg font-sans text-text-muted">/ hr</span>
                </div>
                <p className="text-sm text-text-muted font-medium">
                  You must charge this rate for every billable hour to hit your target take-home pay.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Total Billable Hours</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    {results.billableHours.toFixed(0)} <span className="text-sm">hrs/yr</span>
                  </div>
                  <div className="text-xs text-text-muted mt-1">Out of {results.totalWorkingHours.toFixed(0)} total working hours</div>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Required Gross Revenue</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    ${results.requiredRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-text-muted mt-1">Before taxes and expenses</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <strong>Why so high?</strong> Freelancers have to cover their own payroll taxes, health insurance, admin time, and equipment. A $75k freelance salary requires a much higher hourly rate than a $75k W-2 job.
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your target salary, expenses, and time availability to calculate your true hourly rate.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Mastering Freelance Pricing</h2>
        <p>
          Moving from a traditional W-2 job to freelance work requires an entirely new financial mindset. If you find yourself asking "<strong>how do you calculate hourly rate</strong>?" or "<strong>how do you calculate your hourly rate</strong>?", the simple answer is that you must factor in hidden expenses. 
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">From Salary to Hourly</h3>
        <p>
          Many new independent contractors wonder <strong>how to calculate hourly rate from monthly salary</strong>. You cannot simply divide your old monthly salary by 160 hours. As a freelancer, you are responsible for both halves of your payroll taxes, health insurance premiums, and unpaid admin time. Knowing <strong>how to calculate an hourly rate</strong> properly means backing into the number from your desired net income.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Handling Specific Use-Cases</h3>
        <p>
          Our interface is incredibly flexible for different geographic locations and billing structures:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-6">
          <li>
            <strong>State Tax Nuances:</strong> Are you wondering <strong>how to calculate hourly rate after illinois taxes</strong> (or taxes for New York or California)? Simply input your specific combined state and federal tax burden into the "Tax Rate" field to get an exact location-based rate.
          </li>
          <li>
            <strong>Time & A Half:</strong> If a client demands rush work or weekend availability, you need to know <strong>how to calculate overtime rate per hour</strong>. Once this tool generates your baseline rate, multiply it by 1.5x (or 2.0x) to establish your premium freelance overtime rate.
          </li>
        </ul>
        <p className="text-xs text-text-muted italic">
          *Note for technical contractors: If you arrived here searching for an <strong>air change rate per hour calculator</strong> (ACH), this page is dedicated to financial contracting rates, not HVAC or engineering formulas.
        </p>
      </div>
    </div>
  );
}
