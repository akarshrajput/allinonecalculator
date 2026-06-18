export interface IdealWeightInputs {
  gender: 'male' | 'female';
  height: number; // in cm
}

export interface IdealWeightOutputs {
  robinson: number;
  miller: number;
  devine: number;
  hamwi: number;
  healthyRangeMin: number;
  healthyRangeMax: number;
}

export function calculateIdealWeight(inputs: IdealWeightInputs): IdealWeightOutputs {
  const heightInches = inputs.height / 2.54;
  const inchesOver5Ft = Math.max(0, heightInches - 60);

  // Formulas
  let robinson = 0;
  let miller = 0;
  let devine = 0;
  let hamwi = 0;

  if (inputs.gender === 'male') {
    robinson = 52 + (1.9 * inchesOver5Ft);
    miller = 56.2 + (1.41 * inchesOver5Ft);
    devine = 50 + (2.3 * inchesOver5Ft);
    hamwi = 48 + (2.7 * inchesOver5Ft);
  } else {
    robinson = 49 + (1.7 * inchesOver5Ft);
    miller = 53.1 + (1.36 * inchesOver5Ft);
    devine = 45.5 + (2.3 * inchesOver5Ft);
    hamwi = 45.5 + (2.2 * inchesOver5Ft);
  }

  // Healthy BMI range (18.5 - 24.9)
  // BMI = kg / (m^2)
  // kg = BMI * (m^2)
  const heightM = inputs.height / 100;
  const healthyRangeMin = 18.5 * (heightM * heightM);
  const healthyRangeMax = 24.9 * (heightM * heightM);

  return {
    robinson,
    miller,
    devine,
    hamwi,
    healthyRangeMin,
    healthyRangeMax
  };
}
