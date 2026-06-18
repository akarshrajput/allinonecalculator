export interface MortgageInputs {
  homePrice: number;
  downPayment: number; // in absolute amount, not percentage
  loanTermYears: number;
  interestRate: number; // annual percentage, e.g. 5 for 5%
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  hoaMonthly: number;
  pmiMonthly: number; // private mortgage insurance
}

export interface MortgageOutputs {
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  monthlyPmi: number;
  totalMonthlyPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  totalCostOfLoan: number;
  payoffDate: Date;
}

export function calculateMortgage(inputs: MortgageInputs): MortgageOutputs {
  const principal = inputs.homePrice - inputs.downPayment;
  const monthlyInterestRate = (inputs.interestRate / 100) / 12;
  const totalPayments = inputs.loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyInterestRate > 0) {
    monthlyPrincipalAndInterest = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
  } else {
    monthlyPrincipalAndInterest = principal / totalPayments;
  }

  const monthlyPropertyTax = inputs.propertyTaxAnnual / 12;
  const monthlyHomeInsurance = inputs.homeInsuranceAnnual / 12;
  const totalMonthlyPayment = monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + inputs.hoaMonthly + inputs.pmiMonthly;

  const totalInterest = (monthlyPrincipalAndInterest * totalPayments) - principal;
  const totalCostOfLoan = principal + totalInterest;

  const payoffDate = new Date();
  payoffDate.setFullYear(payoffDate.getFullYear() + inputs.loanTermYears);

  return {
    monthlyPrincipalAndInterest,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoa: inputs.hoaMonthly,
    monthlyPmi: inputs.pmiMonthly,
    totalMonthlyPayment,
    totalPrincipal: principal,
    totalInterest,
    totalCostOfLoan,
    payoffDate
  };
}
