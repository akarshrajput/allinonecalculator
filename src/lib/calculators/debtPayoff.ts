export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // Annual %
  minimumPayment: number;
}

export interface DebtPayoffInputs {
  debts: DebtItem[];
  extraMonthlyPayment: number;
  strategy: 'avalanche' | 'snowball';
}

export interface DebtPayoffOutputs {
  totalStartingBalance: number;
  totalInterestPaid: number;
  totalMonthsToPayoff: number;
  payoffDate: Date;
  monthlySchedule: {
    month: number;
    totalPayment: number;
    totalInterest: number;
    totalPrincipal: number;
    remainingBalance: number;
  }[];
}

export function calculateDebtPayoff(inputs: DebtPayoffInputs): DebtPayoffOutputs {
  // Clone debts so we can mutate
  let debts = inputs.debts.map(d => ({ ...d }));
  
  if (debts.length === 0 || debts.reduce((acc, d) => acc + d.balance, 0) === 0) {
    return {
      totalStartingBalance: 0,
      totalInterestPaid: 0,
      totalMonthsToPayoff: 0,
      payoffDate: new Date(),
      monthlySchedule: []
    };
  }

  // Sort based on strategy
  if (inputs.strategy === 'avalanche') {
    // Highest interest rate first
    debts.sort((a, b) => b.interestRate - a.interestRate);
  } else {
    // Snowball: lowest balance first
    debts.sort((a, b) => a.balance - b.balance);
  }

  const totalStartingBalance = debts.reduce((acc, d) => acc + d.balance, 0);
  let totalInterestPaid = 0;
  let currentMonth = 0;
  const monthlySchedule = [];

  while (debts.some(d => d.balance > 0) && currentMonth < 1200) { // cap at 100 years
    currentMonth++;
    let monthTotalPayment = 0;
    let monthTotalInterest = 0;
    let monthTotalPrincipal = 0;

    // Minimum payments first
    let extraFunds = inputs.extraMonthlyPayment;
    
    // Process minimums and interest
    for (let i = 0; i < debts.length; i++) {
      if (debts[i].balance <= 0) continue;

      const monthlyRate = (debts[i].interestRate / 100) / 12;
      const interest = debts[i].balance * monthlyRate;
      
      let minPayment = debts[i].minimumPayment;
      // if min payment is less than interest, it's a negative amortization trap.
      // We will force minPayment to at least cover interest + 1% to prevent infinite loop.
      if (minPayment <= interest) {
        minPayment = interest + (debts[i].balance * 0.01);
      }

      let payment = minPayment;
      if (payment >= debts[i].balance + interest) {
        payment = debts[i].balance + interest;
        extraFunds += (minPayment - payment); // Roll over unused min payment to extra funds
      }

      debts[i].balance = debts[i].balance + interest - payment;
      monthTotalInterest += interest;
      monthTotalPrincipal += (payment - interest);
      monthTotalPayment += payment;
    }

    // Apply extra funds to the target debt
    for (let i = 0; i < debts.length; i++) {
      if (extraFunds <= 0) break;
      if (debts[i].balance <= 0) continue;

      let payment = extraFunds;
      if (payment >= debts[i].balance) {
        payment = debts[i].balance;
        extraFunds -= payment;
      } else {
        extraFunds = 0;
      }

      debts[i].balance -= payment;
      monthTotalPrincipal += payment;
      monthTotalPayment += payment;
    }

    totalInterestPaid += monthTotalInterest;
    
    // Only save yearly snapshots to avoid massive arrays, or full if needed.
    // We'll save every month for accuracy but could reduce in UI.
    const remainingBalance = debts.reduce((acc, d) => acc + d.balance, 0);
    monthlySchedule.push({
      month: currentMonth,
      totalPayment: monthTotalPayment,
      totalInterest: monthTotalInterest,
      totalPrincipal: monthTotalPrincipal,
      remainingBalance
    });
  }

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + currentMonth);

  return {
    totalStartingBalance,
    totalInterestPaid,
    totalMonthsToPayoff: currentMonth,
    payoffDate,
    monthlySchedule
  };
}
