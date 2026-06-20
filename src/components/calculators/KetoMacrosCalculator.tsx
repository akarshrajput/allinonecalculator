'use client';

import { useState, useMemo } from 'react';

export default function KetoMacrosCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('180');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('10');
  
  const [activity, setActivity] = useState('1.375'); // Lightly active
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('lose');
  
  // Keto specific
  const [carbLimit, setCarbLimit] = useState('25'); // net carbs in grams

  const results = useMemo(() => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const hFt = parseFloat(heightFt);
    const hIn = parseFloat(heightIn);
    
    if (isNaN(a) || isNaN(w) || isNaN(hFt) || isNaN(hIn) || w <= 0 || a <= 0) return null;

    // Convert to metric
    const weightKg = w * 0.453592;
    const heightCm = ((hFt * 12) + hIn) * 2.54;

    // Mifflin-St Jeor Equation for BMR
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * a);
    bmr += gender === 'male' ? 5 : -161;

    // TDEE
    const tdee = bmr * parseFloat(activity);

    // Goal Adjustments
    let targetCalories = tdee;
    if (goal === 'lose') {
      targetCalories *= 0.80; // 20% deficit
    } else if (goal === 'gain') {
      targetCalories *= 1.10; // 10% surplus
    }

    // Macros Calculation (Standard Keto)
    // 1. Carbs are fixed based on user input (usually 20-30g net carbs)
    const carbsGrams = parseFloat(carbLimit) || 25;
    const carbsCalories = carbsGrams * 4;

    // 2. Protein is based on lean mass/activity, but a good rule of thumb for keto is 0.8g per lb of body weight
    const proteinGrams = w * 0.8;
    const proteinCalories = proteinGrams * 4;

    // 3. Fat fills the rest of the calories
    let fatCalories = targetCalories - carbsCalories - proteinCalories;
    if (fatCalories < 0) fatCalories = 0; // Edge case if calories are extremely low
    
    const fatGrams = fatCalories / 9;

    // Calculate Percentages
    const totalCalcCals = carbsCalories + proteinCalories + fatCalories;
    const carbPercent = (carbsCalories / totalCalcCals) * 100;
    const proteinPercent = (proteinCalories / totalCalcCals) * 100;
    const fatPercent = (fatCalories / totalCalcCals) * 100;

    return {
      targetCalories: Math.round(targetCalories),
      carbsGrams: Math.round(carbsGrams),
      proteinGrams: Math.round(proteinGrams),
      fatGrams: Math.round(fatGrams),
      carbPercent,
      proteinPercent,
      fatPercent
    };
  }, [gender, age, weight, heightFt, heightIn, activity, goal, carbLimit]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div className="flex space-x-4 border-b border-border pb-4">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${gender === 'male' ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent'}`}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${gender === 'female' ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent'}`}
            >
              Female
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Weight (lbs)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Height (ft)</label>
              <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Height (in)</label>
              <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Activity Level</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent">
              <option value="1.2">Sedentary (Office job, no exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/week)</option>
              <option value="1.55">Moderately Active (3-5 days/week)</option>
              <option value="1.725">Very Active (6-7 days/week)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium text-text-muted mb-3">Primary Goal</label>
            <div className="flex space-x-3">
              <button onClick={() => setGoal('lose')} className={`flex-1 py-2 border rounded-lg text-sm text-center ${goal === 'lose' ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-white border-border text-text-muted'}`}>Lose Fat</button>
              <button onClick={() => setGoal('maintain')} className={`flex-1 py-2 border rounded-lg text-sm text-center ${goal === 'maintain' ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-white border-border text-text-muted'}`}>Maintain</button>
              <button onClick={() => setGoal('gain')} className={`flex-1 py-2 border rounded-lg text-sm text-center ${goal === 'gain' ? 'bg-accent/10 border-accent text-accent font-semibold' : 'bg-white border-border text-text-muted'}`}>Build Muscle</button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Daily Net Carb Limit (g)</label>
            <input type="number" value={carbLimit} onChange={(e) => setCarbLimit(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent" />
            <p className="text-xs text-text-muted mt-1">Standard keto recommends 20-30g to enter ketosis.</p>
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Daily Calorie Target</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  {results.targetCalories.toLocaleString()}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Calories per day to {goal === 'lose' ? 'lose weight' : goal === 'maintain' ? 'maintain weight' : 'build muscle'}.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-4">
                <h4 className="font-semibold text-text-primary border-b border-border pb-2 mb-4">Your Keto Macros</h4>
                
                <div className="space-y-4">
                  {/* Carbs */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-text-primary">Net Carbs</span>
                      <span className="font-mono text-accent">{results.carbsGrams}g <span className="text-text-muted text-xs">({results.carbPercent.toFixed(1)}%)</span></span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: `${Math.max(results.carbPercent, 2)}%` }}></div>
                    </div>
                  </div>

                  {/* Protein */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-text-primary">Protein</span>
                      <span className="font-mono text-blue-500">{results.proteinGrams}g <span className="text-text-muted text-xs">({results.proteinPercent.toFixed(1)}%)</span></span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${results.proteinPercent}%` }}></div>
                    </div>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-text-primary">Fat</span>
                      <span className="font-mono text-yellow-500">{results.fatGrams}g <span className="text-text-muted text-xs">({results.fatPercent.toFixed(1)}%)</span></span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${results.fatPercent}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <strong>Remember:</strong> On a ketogenic diet, carbs are a <em>limit</em>, protein is a <em>goal</em>, and fat is a <em>lever</em> (eat enough fat to feel full, but you don't have to hit the exact macro limit if your goal is weight loss).
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your physical details to calculate your custom ketogenic macros.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Mastering Your Diet with a Keto Macro Calculator</h2>
        <p>
          If you've ever wondered <strong>how do you calculate your macros</strong>, or specifically <strong>how to calculate your macros for weight loss</strong>, this tool is the ultimate guide. As a specialized <strong>keto macro calculator</strong> (also known as a <strong>keto diet macro calculator</strong> or <strong>keto diet calculator macros</strong>), it tells you exactly what to eat. This is far more advanced than a generic <strong>body recomp calculator</strong> or <strong>body recomposition calculator</strong>. Whether you need a <strong>macro calculator for fat loss</strong> or want to figure out your <strong>best macros for weight loss female</strong> vs male targets, our system handles the complex math for you.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Keto vs. Traditional Macro Tracking</h3>
        <p>
          Standard diets often rely on generic calculators, and users ask questions like "<strong>how do i calculate macros</strong>?" or "<strong>how to calculate your macros</strong>?" expecting high carb answers. For example, a standard <strong>ketogenic macronutrient calculator</strong> will drastically reduce your carbs and increase your fat. You might use a <strong>free meal planning app</strong> (like <strong>mynutrition.com</strong> or looking for the <strong>best app track macros</strong>) to log your food, but you need accurate baseline numbers first. We help you establish the baseline <strong>keto diet macros</strong> and <strong>keto food macros</strong> so you know what to aim for.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Fast Food, Supplements, and Alternative Calculators</h3>
        <p>
          Once you have your numbers from this <strong>keto meal calculator</strong>, you can apply them anywhere. Users often try to fit fast food into their goals using a <strong>chipotle macro calculator</strong>, an <strong>in n out calorie calculator</strong>, a <strong>chick fil a calorie calculator</strong>, or a <strong>mcdonald's calorie counter</strong> (or <strong>mcdonalds calorie calculator</strong>). If you are eating whole foods, you might need a <strong>rice calorie counter</strong> or a dedicated <strong>fiber calculator</strong> to track net carbs. 
        </p>
        <p>
          Fitness enthusiasts also ask "<strong>how do you track macros</strong>" when adding supplements, like wondering <strong>how much water should i drink on creatine calculator</strong> or using a <strong>daily water intake calculator</strong>. If you are a new mother, you might even need a <strong>calories for breastfeeding calculator</strong>.
        </p>
        <p>
          Finally, what about other diets? Some users search for a <strong>macros for muscle gain</strong> tool, a <strong>bulk calculator</strong>, or even a <strong>water fasting weight loss calculator</strong>. Others might ask "<strong>how much carbs should i eat to lose weight calculator</strong>" while browsing the government's <strong>myplate.gov calorie calculator</strong> or specialized coaching tools like the <strong>precision nutrition macro calculator</strong>. You might even stumble upon corporate tools like a <strong>macros inc calculator</strong> (or even unrelated tools like an <strong>ap macro score calculator</strong>, an <strong>ap macro calculator</strong>, a <strong>macroeconomics calculator</strong>, or a <strong>macrs depreciation calculator</strong> for accounting!). However, if your specific goal is ketosis, our <strong>calculadora keto</strong> (Spanish for <strong>calculadora de macros</strong>) is exactly what you need to determine the absolute <strong>best macros for weight loss</strong> and specifically the ideal <strong>macros for weight loss</strong> and <strong>macros for fat loss</strong>.
        </p>
      </div>
    </div>
  );
}
