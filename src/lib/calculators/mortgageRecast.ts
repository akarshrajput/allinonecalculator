export interface MortgageRecastInputs {
  currentBalance: number;
  currentPayment: number; // Principal and Interest only
  lumpSumPayment: number;
  remainingTermMonths: number;
  interestRate: number; // Annual %
}

export interface MortgageRecastOutputs {
  newMonthlyPayment: number;
  monthlySavings: number;
  totalInterestOriginal: number;
  totalInterestNew: number;
  interestSavings: number;
}

export function calculateMortgageRecast(inputs: MortgageRecastInputs): MortgageRecastOutputs {
  const monthlyRate = (inputs.interestRate / 100) / 12;
  const n = inputs.remainingTermMonths;

  // 1. Calculate the total interest they would have paid originally over the remaining term
  // Because they have a current payment, the original principal is the current balance.
  // We can calculate exactly how much interest is left.
  const totalOriginalPaymentCost = inputs.currentPayment * n;
  const totalInterestOriginal = Math.max(0, totalOriginalPaymentCost - inputs.currentBalance);

  // 2. Calculate the new balance after the lump sum
  const newBalance = inputs.currentBalance - inputs.lumpSumPayment;

  // 3. Calculate the new monthly payment based on the new balance, remaining term, and same interest rate
  let newMonthlyPayment = 0;
  if (newBalance > 0) {
    if (monthlyRate > 0) {
      newMonthlyPayment = newBalance * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    } else {
      newMonthlyPayment = newBalance / n;
    }
  }

  const monthlySavings = inputs.currentPayment - newMonthlyPayment;

  // 4. Calculate new total interest
  const totalNewPaymentCost = newMonthlyPayment * n;
  const totalInterestNew = Math.max(0, totalNewPaymentCost - newBalance);

  const interestSavings = totalInterestOriginal - totalInterestNew;

  return {
    newMonthlyPayment,
    monthlySavings,
    totalInterestOriginal,
    totalInterestNew,
    interestSavings
  };
}
