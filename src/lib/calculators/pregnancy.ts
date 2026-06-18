export interface PregnancyInputs {
  calcMethod: 'lmp' | 'ultrasound' | 'conception' | 'ivf';
  date: Date;
  // For IVF: 3-day or 5-day transfer
  ivfType?: '3day' | '5day';
}

export interface PregnancyOutputs {
  estimatedDueDate: Date;
  conceptionDate: Date;
  gestationalAgeWeeks: number;
  gestationalAgeDays: number;
  trimester: 1 | 2 | 3;
  daysRemaining: number;
}

export function calculatePregnancy(inputs: PregnancyInputs): PregnancyOutputs {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  
  let edd = new Date();
  let conception = new Date();

  // Pregnancy is generally 280 days (40 weeks) from LMP
  if (inputs.calcMethod === 'lmp') {
    // EDD = LMP + 280 days
    edd = new Date(inputs.date.getTime() + 280 * ONE_DAY_MS);
    // Conception ~ LMP + 14 days
    conception = new Date(inputs.date.getTime() + 14 * ONE_DAY_MS);
  } 
  else if (inputs.calcMethod === 'conception') {
    // EDD = Conception + 266 days
    conception = new Date(inputs.date.getTime());
    edd = new Date(inputs.date.getTime() + 266 * ONE_DAY_MS);
  } 
  else if (inputs.calcMethod === 'ultrasound') {
    // If they input the EDD given by ultrasound
    edd = new Date(inputs.date.getTime());
    conception = new Date(inputs.date.getTime() - 266 * ONE_DAY_MS);
  }
  else if (inputs.calcMethod === 'ivf') {
    // IVF transfer date
    const transferDate = new Date(inputs.date.getTime());
    const daysToSubtract = inputs.ivfType === '5day' ? 5 : 3;
    // Conception is artificially considered transfer date - embryo age
    conception = new Date(transferDate.getTime() - daysToSubtract * ONE_DAY_MS);
    edd = new Date(conception.getTime() + 266 * ONE_DAY_MS);
  }

  const today = new Date();
  // Gestational age is based on LMP (Conception - 14 days)
  const syntheticLMP = new Date(conception.getTime() - 14 * ONE_DAY_MS);
  const diffDays = Math.floor((today.getTime() - syntheticLMP.getTime()) / ONE_DAY_MS);

  let gestationalAgeWeeks = Math.floor(diffDays / 7);
  let gestationalAgeDays = diffDays % 7;

  // Cap at 42 weeks for display
  if (gestationalAgeWeeks > 42) {
    gestationalAgeWeeks = 42;
    gestationalAgeDays = 0;
  }
  if (gestationalAgeWeeks < 0) {
    gestationalAgeWeeks = 0;
    gestationalAgeDays = 0;
  }

  let trimester: 1 | 2 | 3 = 1;
  if (gestationalAgeWeeks >= 14 && gestationalAgeWeeks < 28) trimester = 2;
  if (gestationalAgeWeeks >= 28) trimester = 3;

  const daysRemaining = Math.max(0, Math.ceil((edd.getTime() - today.getTime()) / ONE_DAY_MS));

  return {
    estimatedDueDate: edd,
    conceptionDate: conception,
    gestationalAgeWeeks,
    gestationalAgeDays,
    trimester,
    daysRemaining
  };
}
