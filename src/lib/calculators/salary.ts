export interface SalaryInputs {
  annualSalary: number;
  state: string;
  filingStatus: 'single' | 'married' | 'head';
  preTaxDeductions: number; // e.g. 401k, health insurance
}

export interface SalaryOutputs {
  grossAnnual: number;
  federalTax: number;
  stateTax: number;
  ficaTax: number;
  totalTaxes: number;
  netAnnual: number;
  netMonthly: number;
  netBiWeekly: number;
  netWeekly: number;
  effectiveTaxRate: number;
}

export function calculateSalary(inputs: SalaryInputs): SalaryOutputs {
  const grossAnnual = inputs.annualSalary;
  const taxableIncome = Math.max(0, grossAnnual - inputs.preTaxDeductions);

  // Simplified 2023 Federal Tax Brackets for 'single'
  // Real app would need full up-to-date IRS tables.
  let federalTax = 0;
  if (inputs.filingStatus === 'single') {
    if (taxableIncome <= 11000) federalTax = taxableIncome * 0.10;
    else if (taxableIncome <= 44725) federalTax = 1100 + (taxableIncome - 11000) * 0.12;
    else if (taxableIncome <= 95375) federalTax = 5147 + (taxableIncome - 44725) * 0.22;
    else if (taxableIncome <= 182100) federalTax = 16290 + (taxableIncome - 95375) * 0.24;
    else federalTax = 37104 + (taxableIncome - 182100) * 0.32; // Simplified upper bound
  } else {
    // married filing jointly simplified
    if (taxableIncome <= 22000) federalTax = taxableIncome * 0.10;
    else if (taxableIncome <= 89450) federalTax = 2200 + (taxableIncome - 22000) * 0.12;
    else if (taxableIncome <= 190750) federalTax = 10294 + (taxableIncome - 89450) * 0.22;
    else federalTax = 32580 + (taxableIncome - 190750) * 0.24;
  }

  // FICA (Social Security 6.2% up to limit, Medicare 1.45%)
  // Social Security limit 2023: $160,200
  const ssTaxable = Math.min(grossAnnual, 160200); // FICA based on gross, pre-tax deductions might exempt depending on type but we simplify
  const ficaTax = (ssTaxable * 0.062) + (grossAnnual * 0.0145);

  // State Tax (Highly simplified: mock 5% average for states that have tax, 0 for no-tax states)
  const noTaxStates = ['TX', 'FL', 'NV', 'WA', 'AK', 'WY', 'SD'];
  let stateTax = 0;
  if (!noTaxStates.includes(inputs.state)) {
    stateTax = taxableIncome * 0.05; // 5% flat mock
  }

  const totalTaxes = federalTax + stateTax + ficaTax;
  const netAnnual = grossAnnual - inputs.preTaxDeductions - totalTaxes;

  return {
    grossAnnual,
    federalTax,
    stateTax,
    ficaTax,
    totalTaxes,
    netAnnual,
    netMonthly: netAnnual / 12,
    netBiWeekly: netAnnual / 26,
    netWeekly: netAnnual / 52,
    effectiveTaxRate: (totalTaxes / grossAnnual) * 100
  };
}
