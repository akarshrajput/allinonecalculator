export interface LoanInputs {
  loanAmount: number;
  interestRate: number; // annual percentage
  loanTermMonths: number;
}

export interface LoanOutputs {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  amortizationSchedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }[];
}

export function calculateLoan(inputs: LoanInputs): LoanOutputs {
  const principal = inputs.loanAmount;
  const monthlyInterestRate = (inputs.interestRate / 100) / 12;
  const totalPayments = inputs.loanTermMonths;

  let monthlyPayment = 0;
  if (monthlyInterestRate > 0) {
    monthlyPayment = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  } else {
    monthlyPayment = principal / totalPayments;
  }

  const totalInterest = (monthlyPayment * totalPayments) - principal;
  const totalCost = principal + totalInterest;

  let remainingBalance = principal;
  const amortizationSchedule = [];

  // Generate for first 12 months for brevity in UI, but logic supports full.
  // Actually we'll calculate all to allow the UI to chart it if needed.
  for (let month = 1; month <= totalPayments; month++) {
    const interestPayment = remainingBalance * monthlyInterestRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    if (remainingBalance < 0) remainingBalance = 0;

    amortizationSchedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance
    });
  }

  return {
    monthlyPayment,
    totalInterest,
    totalCost,
    amortizationSchedule
  };
}
