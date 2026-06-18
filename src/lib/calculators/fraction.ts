export interface FractionInputs {
  num1: number;
  den1: number;
  operation: 'add' | 'subtract' | 'multiply' | 'divide';
  num2: number;
  den2: number;
}

export interface FractionOutputs {
  resultNum: number;
  resultDen: number;
  isMixed: boolean;
  mixedWhole: number;
  mixedNum: number;
  mixedDen: number;
  decimal: number;
}

// Helper to find Greatest Common Divisor
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  if (b === 0) return a;
  return gcd(b, a % b);
}

export function calculateFraction(inputs: FractionInputs): FractionOutputs {
  let num1 = inputs.num1;
  let den1 = inputs.den1;
  let num2 = inputs.num2;
  let den2 = inputs.den2;
  
  // If denominator is 0, technically undefined, we'll return 0/0
  if (den1 === 0 || den2 === 0) {
    return { resultNum: 0, resultDen: 0, isMixed: false, mixedWhole: 0, mixedNum: 0, mixedDen: 0, decimal: 0 };
  }

  let resNum = 0;
  let resDen = 1;

  if (inputs.operation === 'add') {
    resNum = num1 * den2 + num2 * den1;
    resDen = den1 * den2;
  } else if (inputs.operation === 'subtract') {
    resNum = num1 * den2 - num2 * den1;
    resDen = den1 * den2;
  } else if (inputs.operation === 'multiply') {
    resNum = num1 * num2;
    resDen = den1 * den2;
  } else if (inputs.operation === 'divide') {
    resNum = num1 * den2;
    resDen = den1 * num2;
  }

  // Handle divide by zero edge case in division operation
  if (resDen === 0) {
    return { resultNum: 0, resultDen: 0, isMixed: false, mixedWhole: 0, mixedNum: 0, mixedDen: 0, decimal: 0 };
  }

  // Normalize signs
  if (resDen < 0) {
    resNum = -resNum;
    resDen = -resDen;
  }

  // Simplify
  const commonDivisor = gcd(resNum, resDen);
  resNum = resNum / commonDivisor;
  resDen = resDen / commonDivisor;

  let isMixed = false;
  let mixedWhole = 0;
  let mixedNum = Math.abs(resNum);
  let mixedDen = resDen;

  if (Math.abs(resNum) >= resDen && resDen !== 1) {
    isMixed = true;
    mixedWhole = Math.trunc(resNum / resDen);
    mixedNum = Math.abs(resNum % resDen);
  }

  return {
    resultNum: resNum,
    resultDen: resDen,
    isMixed,
    mixedWhole,
    mixedNum,
    mixedDen,
    decimal: resNum / resDen
  };
}
