export interface ReverseMortgageInputs {
  homeValue: number;
  age: number;
  existingMortgageBalance: number;
  expectedInterestRate: number; // e.g. 7.0 for 7%
}

export interface ReverseMortgageOutputs {
  principalLimit: number;
  availableFunds: number;
  monthlyPayoutOption: number; // Rough estimate if taken as tenure payout
  lumpSumOption: number;
  lineOfCreditOption: number;
  isEligible: boolean;
}

export function calculateReverseMortgage(inputs: ReverseMortgageInputs): ReverseMortgageOutputs {
  // Basic HECM (Home Equity Conversion Mortgage) estimation logic
  // Max claim amount is currently capped around $1,089,300 (2023 limit)
  const MAX_CLAIM_AMOUNT = 1089300;
  const effectiveHomeValue = Math.min(inputs.homeValue, MAX_CLAIM_AMOUNT);
  
  const isEligible = inputs.age >= 62;

  // Principal Limit Factor (PLF) is based on age and interest rate.
  // This is a simplified lookup/formula approximation.
  // Older = higher PLF. Higher rate = lower PLF.
  let plf = 0;
  if (isEligible) {
    const ageFactor = (inputs.age - 62) * 0.005; 
    const rateFactor = (inputs.expectedInterestRate - 5.0) * -0.05;
    plf = Math.max(0.1, Math.min(0.75, 0.4 + ageFactor + rateFactor));
  }

  const principalLimit = effectiveHomeValue * plf;
  
  // Mandatory obligations (existing mortgage)
  const availableFunds = Math.max(0, principalLimit - inputs.existingMortgageBalance);

  // Tenure payout: roughly spread over (100 - age) years
  const remainingYears = Math.max(5, 100 - inputs.age);
  const monthlyPayoutOption = availableFunds / (remainingYears * 12);

  // Lump sum is usually restricted to 60% of principal limit in the first year
  const maxFirstYearLumpSum = Math.min(availableFunds, principalLimit * 0.6);

  return {
    principalLimit,
    availableFunds,
    monthlyPayoutOption,
    lumpSumOption: maxFirstYearLumpSum,
    lineOfCreditOption: availableFunds,
    isEligible
  };
}
