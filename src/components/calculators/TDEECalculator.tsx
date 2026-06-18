'use client';

import { useState, useMemo } from 'react';
import { calculateTDEE, TDEEInputs } from '@/lib/calculators/tdee';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function TDEECalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  const [weightKg, setWeightKg] = useState<string>('70');
  const [heightCm, setHeightCm] = useState<string>('175');
  
  const [weightLbs, setWeightLbs] = useState<string>('154');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');
  
  const [activityLevel, setActivityLevel] = useState<TDEEInputs['activityLevel']>('moderate');
  const [goal, setGoal] = useState<TDEEInputs['goal']>('maintain');

  const results = useMemo(() => {
    let w = 0;
    let h = 0;

    if (unitSystem === 'metric') {
      w = parseFloat(weightKg);
      h = parseFloat(heightCm);
    } else {
      w = parseFloat(weightLbs) * 0.453592;
      const totalInches = (parseInt(heightFt) || 0) * 12 + (parseInt(heightIn) || 0);
      h = totalInches * 2.54;
    }

    const a = parseInt(age);

    if (!w || !h || !a || a <= 0 || w <= 0 || h <= 0) return null;

    return calculateTDEE({
      age: a,
      gender,
      weight: w,
      height: h,
      activityLevel,
      goal
    });
  }, [unitSystem, age, gender, weightKg, heightCm, weightLbs, heightFt, heightIn, activityLevel, goal]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`font-semibold ${unitSystem === 'imperial' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Imperial (lbs, ft)
        </button>
        <button
          onClick={() => setUnitSystem('metric')}
          className={`font-semibold ${unitSystem === 'metric' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Metric (kg, cm)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Gender</label>
              <select value={gender} onChange={(e) => setGender(e.target.value as any)} className="w-full px-4 py-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {unitSystem === 'metric' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Height (cm)</label>
                <input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} className="w-full px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Weight (kg)</label>
                <input type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} className="w-full px-4 py-2" />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Height (ft)</label>
                  <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Height (in)</label>
                  <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Weight (lbs)</label>
                <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} className="w-full px-4 py-2" />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Activity Level</label>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value as any)} className="w-full px-4 py-2">
              <option value="sedentary">Sedentary: little or no exercise</option>
              <option value="light">Light: exercise 1-3 times/week</option>
              <option value="moderate">Moderate: exercise 4-5 times/week</option>
              <option value="active">Active: daily exercise or intense exercise 3-4 times/week</option>
              <option value="veryActive">Very Active: intense exercise 6-7 times/week</option>
              <option value="extraActive">Extra Active: very intense exercise daily, or physical job</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Your Goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value as any)} className="w-full px-4 py-2">
              <option value="cut">Cutting (Lose Weight)</option>
              <option value="maintain">Maintenance</option>
              <option value="bulk">Bulking (Gain Muscle)</option>
            </select>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Target Calories</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  {results.targetCalories.toLocaleString()} <span className="text-sm font-sans text-text-muted font-medium">calories / day</span>
                </div>
                <p className="text-sm text-text-muted">
                  Your TDEE (Maintenance) is <strong>{results.tdee.toLocaleString()}</strong> calories.
                </p>
              </div>
              
              <div>
                <h4 className="font-display font-bold text-lg mb-4 text-text-primary">Recommended Macro Splits</h4>
                <div className="space-y-4">
                  {/* Moderate Carb */}
                  <div className="p-4 bg-surface border border-border rounded-lg">
                    <h5 className="font-semibold text-text-primary mb-2 text-sm">Moderate Carb (30/35/35)</h5>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-text-muted">Protein</div>
                        <div className="font-mono font-bold">{results.macros.moderateCarb.protein}g</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted">Fat</div>
                        <div className="font-mono font-bold">{results.macros.moderateCarb.fat}g</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted">Carbs</div>
                        <div className="font-mono font-bold">{results.macros.moderateCarb.carbs}g</div>
                      </div>
                    </div>
                  </div>

                  {/* Lower Carb */}
                  <div className="p-4 bg-surface border border-border rounded-lg">
                    <h5 className="font-semibold text-text-primary mb-2 text-sm">Lower Carb (40/40/20)</h5>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-text-muted">Protein</div>
                        <div className="font-mono font-bold">{results.macros.lowerCarb.protein}g</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted">Fat</div>
                        <div className="font-mono font-bold">{results.macros.lowerCarb.fat}g</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-muted">Carbs</div>
                        <div className="font-mono font-bold">{results.macros.lowerCarb.carbs}g</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your details to calculate your TDEE and macros.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
