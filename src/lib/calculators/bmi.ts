export interface BMIInputs {
  heightCm: number;
  weightKg: number;
  age: number;
  isMale: boolean;
}

export interface BMIOutputs {
  bmi: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  healthyWeightRange: [number, number];
}

export function calculateBMI(inputs: BMIInputs): BMIOutputs {
  const heightM = inputs.heightCm / 100;
  const bmi = inputs.weightKg / (heightM * heightM);

  let category: BMIOutputs['category'] = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 25 && bmi < 30) category = 'Overweight';
  else if (bmi >= 30) category = 'Obese';

  const minHealthyWeight = 18.5 * (heightM * heightM);
  const maxHealthyWeight = 24.9 * (heightM * heightM);

  return {
    bmi,
    category,
    healthyWeightRange: [minHealthyWeight, maxHealthyWeight]
  };
}

export function lbsToKg(lbs: number) { return lbs * 0.453592; }
export function kgToLbs(kg: number) { return kg * 2.20462; }
export function inToCm(inches: number) { return inches * 2.54; }
