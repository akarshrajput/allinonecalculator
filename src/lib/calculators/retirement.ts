export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnRate: number; // e.g. 7 for 7%
  inflationRate: number; // e.g. 2.5 for 2.5%
}

export interface RetirementOutputs {
  projectedSavings: number;
  inflationAdjustedSavings: number;
  monthlyIncomeInRetirement: number; // Using 4% rule
  yearsMoneyWillLast: number; // Rough estimate based on withdrawals
  growthSchedule: {
    age: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

export function calculateRetirement(inputs: RetirementInputs): RetirementOutputs {
  const yearsToRetire = inputs.retirementAge - inputs.currentAge;
  if (yearsToRetire <= 0) {
    return {
      projectedSavings: inputs.currentSavings,
      inflationAdjustedSavings: inputs.currentSavings,
      monthlyIncomeInRetirement: (inputs.currentSavings * 0.04) / 12,
      yearsMoneyWillLast: 0,
      growthSchedule: []
    };
  }

  const annualReturn = inputs.expectedReturnRate / 100;
  const monthlyReturn = annualReturn / 12;
  const totalMonths = yearsToRetire * 12;

  let balance = inputs.currentSavings;
  let totalContributions = inputs.currentSavings;
  let totalInterest = 0;

  const growthSchedule = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyReturn;
    balance += interest + inputs.monthlyContribution;
    totalContributions += inputs.monthlyContribution;
    totalInterest += interest;

    if (month % 12 === 0) {
      growthSchedule.push({
        age: inputs.currentAge + (month / 12),
        balance,
        contributions: totalContributions,
        interest: totalInterest
      });
    }
  }

  const projectedSavings = balance;
  
  // Adjust for inflation
  const inflationFactor = Math.pow(1 + (inputs.inflationRate / 100), yearsToRetire);
  const inflationAdjustedSavings = projectedSavings / inflationFactor;

  // 4% safe withdrawal rule
  const annualIncome = projectedSavings * 0.04;
  const monthlyIncomeInRetirement = annualIncome / 12;

  // Very rough estimate: if they withdraw 4%, it usually lasts ~30 years
  const yearsMoneyWillLast = 30; 

  return {
    projectedSavings,
    inflationAdjustedSavings,
    monthlyIncomeInRetirement,
    yearsMoneyWillLast,
    growthSchedule
  };
}
