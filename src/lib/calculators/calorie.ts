export interface CalorieInputs {
  age: number;
  gender: 'male' | 'female';
  weight: number; // in kg
  height: number; // in cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | 'extraActive';
}

export interface CalorieOutputs {
  bmr: number;
  maintenance: number;
  mildWeightLoss: number; // 0.25 kg/week
  weightLoss: number; // 0.5 kg/week
  extremeWeightLoss: number; // 1 kg/week
  mildWeightGain: number; // 0.25 kg/week
  weightGain: number; // 0.5 kg/week
}

export function calculateCalories(inputs: CalorieInputs): CalorieOutputs {
  // Mifflin-St Jeor Equation
  let bmr = (10 * inputs.weight) + (6.25 * inputs.height) - (5 * inputs.age);
  if (inputs.gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Activity Multiplier
  let multiplier = 1.2;
  switch (inputs.activityLevel) {
    case 'sedentary': multiplier = 1.2; break; // Little or no exercise
    case 'light': multiplier = 1.375; break; // Light exercise/sports 1-3 days/week
    case 'moderate': multiplier = 1.55; break; // Moderate exercise/sports 3-5 days/week
    case 'active': multiplier = 1.725; break; // Hard exercise/sports 6-7 days a week
    case 'veryActive': multiplier = 1.9; break; // Very hard exercise/sports & physical job
    case 'extraActive': multiplier = 2.4; break; // Pro athlete level (rare)
  }

  const maintenance = Math.round(bmr * multiplier);

  // 1 lb of fat ~= 3500 calories -> 500 cal/day = 1 lb/week
  // 1 kg of fat ~= 7700 calories -> 1100 cal/day = 1 kg/week
  // General safe guidelines: 
  // Mild loss (0.25 kg/week) = -275 cal/day
  // Weight loss (0.5 kg/week) = -550 cal/day
  // Extreme loss (1 kg/week) = -1100 cal/day
  
  return {
    bmr: Math.round(bmr),
    maintenance,
    mildWeightLoss: Math.max(1200, maintenance - 250), // Standardized ~0.5 lb
    weightLoss: Math.max(1200, maintenance - 500),     // Standardized ~1 lb
    extremeWeightLoss: Math.max(1200, maintenance - 1000), // Standardized ~2 lbs
    mildWeightGain: maintenance + 250,
    weightGain: maintenance + 500
  };
}
