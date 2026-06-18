export interface BodyFatInputs {
  gender: 'male' | 'female';
  age: number;
  weight: number; // in kg
  height: number; // in cm
  neck: number; // in cm
  waist: number; // in cm
  hip?: number; // in cm (required for females)
}

export interface BodyFatOutputs {
  bodyFatPercentage: number;
  fatMass: number; // in kg
  leanMass: number; // in kg
  category: string;
}

export function calculateBodyFat(inputs: BodyFatInputs): BodyFatOutputs {
  // U.S. Navy Method
  // Male: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
  // Female: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450

  let bf = 0;
  if (inputs.gender === 'male') {
    const diff = inputs.waist - inputs.neck;
    if (diff <= 0) return { bodyFatPercentage: 0, fatMass: 0, leanMass: 0, category: 'Invalid' };
    
    const term1 = 1.0324;
    const term2 = 0.19077 * Math.log10(diff);
    const term3 = 0.15456 * Math.log10(inputs.height);
    
    bf = 495 / (term1 - term2 + term3) - 450;
  } else {
    if (!inputs.hip) return { bodyFatPercentage: 0, fatMass: 0, leanMass: 0, category: 'Invalid' };
    const diff = inputs.waist + inputs.hip - inputs.neck;
    if (diff <= 0) return { bodyFatPercentage: 0, fatMass: 0, leanMass: 0, category: 'Invalid' };

    const term1 = 1.29579;
    const term2 = 0.35004 * Math.log10(diff);
    const term3 = 0.22100 * Math.log10(inputs.height);

    bf = 495 / (term1 - term2 + term3) - 450;
  }

  // Safety caps
  if (bf < 2) bf = 2; // Essential fat min for men
  if (bf > 60) bf = 60;

  const fatMass = inputs.weight * (bf / 100);
  const leanMass = inputs.weight - fatMass;

  let category = '';
  if (inputs.gender === 'male') {
    if (bf < 6) category = 'Essential Fat';
    else if (bf <= 13) category = 'Athletes';
    else if (bf <= 17) category = 'Fitness';
    else if (bf <= 24) category = 'Average';
    else category = 'Obese';
  } else {
    if (bf < 14) category = 'Essential Fat';
    else if (bf <= 20) category = 'Athletes';
    else if (bf <= 24) category = 'Fitness';
    else if (bf <= 31) category = 'Average';
    else category = 'Obese';
  }

  return {
    bodyFatPercentage: bf,
    fatMass,
    leanMass,
    category
  };
}
