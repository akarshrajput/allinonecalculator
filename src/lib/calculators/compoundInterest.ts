export interface CompoundInterestInputs {
  principal: number;
  annualInterestRate: number; // e.g., 5.5 for 5.5%
  compoundFrequency: 'daily' | 'monthly' | 'quarterly' | 'annually';
  timePeriodYears: number;
  monthlyContribution: number;
}

export interface CompoundInterestOutputs {
  finalAmount: number;
  totalPrincipal: number;
  totalContributions: number;
  totalInterestEarned: number;
  growthSchedule: {
    year: number;
    balance: number;
    totalContributions: number;
    totalInterest: number;
  }[];
}

export function calculateCompoundInterest(inputs: CompoundInterestInputs): CompoundInterestOutputs {
  let periodsPerYear = 12; // default monthly
  if (inputs.compoundFrequency === 'daily') periodsPerYear = 365;
  if (inputs.compoundFrequency === 'quarterly') periodsPerYear = 4;
  if (inputs.compoundFrequency === 'annually') periodsPerYear = 1;

  const r = inputs.annualInterestRate / 100;
  const n = periodsPerYear;
  const t = inputs.timePeriodYears;

  let balance = inputs.principal;
  let totalContributions = 0;
  let totalInterestEarned = 0;
  
  const growthSchedule = [];

  // Simulate monthly for contribution logic, or we can use exact formulas.
  // Simulation is easier for tracking year-by-year cleanly with contributions.
  let currentMonth = 0;
  const totalMonths = t * 12;
  const monthlyRate = r / 12; // Simplified approximation of daily/quarterly if we simulate monthly.
  
  // Actually, to respect compound frequency exactly, we should compound at the exact intervals.
  // But standard industry practice for "monthly contributions" with daily/quarterly compounding
  // usually just simulates month by month with effective rates, or uses the FV formula.
  
  // Let's use exact simulation.
  // We'll advance month by month, add contribution, and compound based on frequency.
  
  balance = inputs.principal;
  for (let year = 1; year <= t; year++) {
    for (let month = 1; month <= 12; month++) {
      // Add contribution at the beginning of the month
      balance += inputs.monthlyContribution;
      totalContributions += inputs.monthlyContribution;

      // Apply interest
      let interest = 0;
      if (inputs.compoundFrequency === 'monthly') {
        interest = balance * (r / 12);
      } else if (inputs.compoundFrequency === 'daily') {
        // approximate daily compounding over a month (365/12 days)
        const days = 365 / 12;
        const newBalance = balance * Math.pow(1 + r / 365, days);
        interest = newBalance - balance;
      } else if (inputs.compoundFrequency === 'quarterly' && month % 3 === 0) {
        interest = balance * (r / 4);
      } else if (inputs.compoundFrequency === 'annually' && month === 12) {
        interest = balance * r;
      }

      balance += interest;
      totalInterestEarned += interest;
    }

    growthSchedule.push({
      year,
      balance,
      totalContributions,
      totalInterest: totalInterestEarned
    });
  }

  return {
    finalAmount: balance,
    totalPrincipal: inputs.principal,
    totalContributions,
    totalInterestEarned,
    growthSchedule
  };
}
