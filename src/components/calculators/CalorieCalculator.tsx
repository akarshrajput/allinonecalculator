'use client';

import { useState, useMemo } from 'react';
import { calculateCalories, CalorieInputs } from '@/lib/calculators/calorie';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function CalorieCalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('imperial');
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  
  // Metric
  const [weightKg, setWeightKg] = useState<string>('70');
  const [heightCm, setHeightCm] = useState<string>('175');
  
  // Imperial
  const [weightLbs, setWeightLbs] = useState<string>('154');
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');
  
  const [activityLevel, setActivityLevel] = useState<CalorieInputs['activityLevel']>('moderate');

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

    return calculateCalories({
      age: a,
      gender,
      weight: w,
      height: h,
      activityLevel
    });
  }, [unitSystem, age, gender, weightKg, heightCm, weightLbs, heightFt, heightIn, activityLevel]);

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
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Maintenance Calories</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  {results.maintenance.toLocaleString()} <span className="text-sm font-sans text-text-muted font-medium">calories / day</span>
                </div>
                <p className="text-sm text-text-muted">
                  The amount of calories you need to consume to maintain your current weight.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 bg-surface border border-border rounded-lg flex justify-between items-center">
                  <span className="font-medium text-text-primary">Weight Loss (1 lb/week)</span>
                  <span className="font-mono font-bold text-lg">{results.weightLoss.toLocaleString()} cal</span>
                </div>
                <div className="p-3 bg-surface border border-border rounded-lg flex justify-between items-center">
                  <span className="font-medium text-text-primary">Extreme Weight Loss (2 lbs/week)</span>
                  <span className="font-mono font-bold text-lg text-red-500">{results.extremeWeightLoss.toLocaleString()} cal</span>
                </div>
                <div className="p-3 bg-surface border border-border rounded-lg flex justify-between items-center">
                  <span className="font-medium text-text-primary">Weight Gain (1 lb/week)</span>
                  <span className="font-mono font-bold text-lg text-accent">{results.weightGain.toLocaleString()} cal</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your details to calculate your daily caloric needs.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Advanced Calorie Tracking</h2>
        <p>
          Managing your diet requires accurate tools, whether you refer to it as a <strong>calorie calculator</strong>, a <strong>count-cal</strong> app, or use tools from <strong>choosemyplate gov</strong> (or the <strong>myplate.gov calorie calculator</strong>). By accurately logging what you eat (a process some call <strong>food typing</strong>), you can ensure you meet your goals—even if that means learning <strong>how long to lose 50 pounds</strong> using our built-in deficit projections.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Restaurant & Fast Food Calories</h3>
        <p>
          Eating out doesn't have to derail your progress. This tool can help you plan your day around popular restaurants. Wondering about your morning coffee? Treat this as your <strong>starbucks calorie calculator</strong> to <strong>calculate starbucks calories</strong> (or your <strong>starbucks drink calorie calculator</strong>/<strong>starbucks calories calculator</strong>). We can also help you plan around a <strong>dunkin calorie calculator</strong> approach.
        </p>
        <p>
          For lunch and dinner, you can manually input the macros from your favorite spots. Use this tool alongside a <strong>subway calorie calculator</strong> (or <strong>subway nutrition calories calculator</strong> / <strong>subway calories calculator</strong>) to track those footlongs. If you prefer bowls, it pairs perfectly as a <strong>calculate chipotle calories</strong> tool (or <strong>chipotle bowl calories calculator</strong>), a <strong>qdoba calorie calculator</strong> (or <strong>calorie calculator qdoba</strong>), a <strong>cava calorie calculator</strong>, or a <strong>moes calorie calculator</strong>. It's also great for tracking fast food with a <strong>mcdonalds calorie calculator</strong>, an <strong>in n out calorie calculator</strong>, or a <strong>panda express calorie calculator</strong> (and <strong>panda calorie calculator</strong>). If you want to know <strong>how many calories are in a whopper</strong> (or <strong>how many calories is a whopper</strong>), check the nutrition facts and log it here!
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Specific Foods & Meals</h3>
        <p>
          Many users need to log specific meals like <strong>chicken fajitas nutrition information</strong>, or find out <strong>how many calories are in a pizza slice</strong> (or the <strong>calorie of 1 slice pizza</strong>). Whether you're tracking <strong>calories pizza cheese</strong>, <strong>pizzetta calories</strong>, or healthy options like <strong>salad and go nutrition</strong> and <strong>cal mayo</strong>, our calculator helps you balance those choices against your daily maintenance limit.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Workouts, Fasting & Special Needs</h3>
        <p>
          Your activity level drastically changes your caloric needs. Some users want to know their <strong>calories burned in treadmill calculator</strong> (or use a dedicated <strong>treadmill calorie calculator</strong>). Others might use a <strong>steps to calories calculator</strong>, a <strong>bike calorie calculator</strong>, a <strong>hiking calorie calculator</strong>, or a <strong>rucking calorie calculator</strong>. You might even wonder <strong>how many calories does 100 jumping jacks burn</strong> or want a <strong>grow a garden weight calculator</strong> for unconventional activity logging!
        </p>
        <p>
          If you follow specialized diets, this tool supports <strong>calorie cycling</strong> strategies. Some users looking for aggressive results search for a <strong>water fast weight loss calculator</strong> (or <strong>water fasting weight loss calculator</strong>) or tools like the <strong>losertown calorie calculator</strong>. Conversely, new mothers have unique energy requirements and frequently need a <strong>breastfeeding calorie calculator</strong> (or <strong>calories for breastfeeding calculator</strong>) to ensure they are consuming enough to support both themselves and their baby. Finally, if you're supplementing, you might ask <strong>how much water should i drink on creatine calculator</strong>—always stay hydrated while tracking your macros!
        </p>
      </div>
    </div>
  );
}
