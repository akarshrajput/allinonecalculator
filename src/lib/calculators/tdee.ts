export interface TDEEInputs {
  age: number;
  gender: 'male' | 'female';
  weight: number; // in kg
  height: number; // in cm
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive' | 'extraActive';
  goal: 'cut' | 'maintain' | 'bulk';
}

export interface MacroSplit {
  protein: number; // grams
  fat: number; // grams
  carbs: number; // grams
  calories: number;
}

export interface TDEEOutputs {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: {
    moderateCarb: MacroSplit; // 30% P / 35% F / 35% C
    lowerCarb: MacroSplit;    // 40% P / 40% F / 20% C
    higherCarb: MacroSplit;   // 30% P / 20% F / 50% C
  };
}

export function calculateTDEE(inputs: TDEEInputs): TDEEOutputs {
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
    case 'sedentary': multiplier = 1.2; break;
    case 'light': multiplier = 1.375; break;
    case 'moderate': multiplier = 1.55; break;
    case 'active': multiplier = 1.725; break;
    case 'veryActive': multiplier = 1.9; break;
    case 'extraActive': multiplier = 2.4; break;
  }

  const tdee = Math.round(bmr * multiplier);

  let targetCalories = tdee;
  if (inputs.goal === 'cut') {
    targetCalories = Math.max(1200, tdee - 500); // 500 cal deficit
  } else if (inputs.goal === 'bulk') {
    targetCalories = tdee + 500; // 500 cal surplus
  }

  // Calculate Macros
  // Protein = 4 cal/g, Carbs = 4 cal/g, Fat = 9 cal/g
  const calculateSplit = (pPct: number, fPct: number, cPct: number): MacroSplit => {
    return {
      calories: targetCalories,
      protein: Math.round((targetCalories * pPct) / 4),
      fat: Math.round((targetCalories * fPct) / 9),
      carbs: Math.round((targetCalories * cPct) / 4),
    };
  };

  return {
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    macros: {
      moderateCarb: calculateSplit(0.30, 0.35, 0.35),
      lowerCarb: calculateSplit(0.40, 0.40, 0.20),
      higherCarb: calculateSplit(0.30, 0.20, 0.50),
    }
  };
}
