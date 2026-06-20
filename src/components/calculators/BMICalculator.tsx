'use client';

import { useState, useMemo } from 'react';
import { calculateBMI, lbsToKg, inToCm, kgToLbs } from '@/lib/calculators/bmi';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function BMICalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [feet, setFeet] = useState('5');
  const [inches, setInches] = useState('9');
  const [cm, setCm] = useState('175');
  const [lbs, setLbs] = useState('160');
  const [kg, setKg] = useState('72');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const results = useMemo(() => {
    let heightCm = 0;
    let weightKg = 0;

    if (unit === 'imperial') {
      const totalInches = (parseInt(feet) || 0) * 12 + (parseInt(inches) || 0);
      heightCm = inToCm(totalInches);
      weightKg = lbsToKg(parseFloat(lbs) || 0);
    } else {
      heightCm = parseFloat(cm) || 0;
      weightKg = parseFloat(kg) || 0;
    }

    if (heightCm <= 0 || weightKg <= 0) return null;

    return calculateBMI({
      heightCm,
      weightKg,
      age: parseInt(age) || 25,
      isMale: gender === 'male'
    });
  }, [unit, feet, inches, cm, lbs, kg, age, gender]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex mb-6 space-x-4 border-b border-border pb-4">
        <button 
          onClick={() => setUnit('imperial')}
          className={`font-semibold ${unit === 'imperial' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted'}`}
        >
          Imperial (lbs, ft, in)
        </button>
        <button 
          onClick={() => setUnit('metric')}
          className={`font-semibold ${unit === 'metric' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted'}`}
        >
          Metric (kg, cm)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Age</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Gender</label>
              <select value={gender} onChange={e => setGender(e.target.value as any)} className="w-full px-4 py-2">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {unit === 'imperial' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Height (Feet)</label>
                  <input type="number" value={feet} onChange={e => setFeet(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Height (Inches)</label>
                  <input type="number" value={inches} onChange={e => setInches(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Weight (lbs)</label>
                <input type="number" value={lbs} onChange={e => setLbs(e.target.value)} className="w-full px-4 py-2" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Height (cm)</label>
                <input type="number" value={cm} onChange={e => setCm(e.target.value)} className="w-full px-4 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Weight (kg)</label>
                <input type="number" value={kg} onChange={e => setKg(e.target.value)} className="w-full px-4 py-2" />
              </div>
            </>
          )}
        </div>

        <div>
          {results && (
            <div className="bg-result-bg rounded-xl p-6 border border-success h-full flex flex-col justify-center text-center">
              <h3 className="text-xl font-semibold text-text-primary mb-2">Your BMI is</h3>
              <div className="text-5xl font-mono font-bold text-success mb-2">
                {results.bmi.toFixed(1)}
              </div>
              <div className="text-lg font-bold text-text-primary mb-6">
                Category: <span className={results.category === 'Normal' ? 'text-success' : 'text-orange-500'}>{results.category}</span>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-border">
                <p className="text-sm text-text-muted mb-1">Healthy Weight Range for your height:</p>
                <p className="font-semibold text-text-primary">
                  {unit === 'imperial' 
                    ? `${kgToLbs(results.healthyWeightRange[0]).toFixed(1)} lbs - ${kgToLbs(results.healthyWeightRange[1]).toFixed(1)} lbs`
                    : `${results.healthyWeightRange[0].toFixed(1)} kg - ${results.healthyWeightRange[1].toFixed(1)} kg`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Advanced BMI Calculations</h2>
        <p>
          Beyond standard calculations, many users look for specialized tools such as a <strong>lean bmi calculator</strong> or a <strong>geriatric bmi calculator</strong> for older adults. If you have unique physical circumstances, you might be searching for a <strong>bmi amputation calculator</strong> (also known as a <strong>bmi amputee calculator</strong> or how to <strong>calculate bmi for amputee</strong> and <strong>bmi calculator amputation</strong>) which adjusts the standard formulas for missing limbs.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Specialty & Demographic Scenarios</h3>
        <p>
          Some users search for demographic-specific tools like an <strong>aarp bmi calculator</strong> or a <strong>black bmi calculator</strong>. Furthermore, for military readiness, utilizing an <strong>air force bmi calculator</strong> or a <strong>navy bmi calculator</strong> can help service members ensure they meet specific physical standards. In the UK, many rely on the <strong>nhs bmi calculator</strong> (or <strong>bmi calculator nhs</strong>) for official health guidance.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Reverse Calculations & Pets</h3>
        <p>
          If you already know your target BMI and want to find the corresponding weight, you might need a <strong>reverse bmi calculator</strong> (sometimes called a <strong>backwards bmi calculator</strong>, <strong>bmi reverse calculator</strong>, or used for <strong>bmi reverse calculation</strong>). Interestingly, BMI isn't just for humans! Pet owners frequently search for a <strong>dog bmi calculator</strong> or a <strong>cat bmi calculator</strong> to check their furry friend's health.
        </p>

        <p className="text-xs mt-6 opacity-70">
          <em>Note: When downloading health applications, always verify the source. Recently, there were reports where <strong>amazon fire stick users warned about spying bmi calculator app</strong> issues, highlighting the importance of using secure, browser-based tools like ours.</em>
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Additional Health Metrics & Quizzes</h3>
        <p>
          While BMI is a useful starting point (often seen as a numeric <strong>bmi visualizer</strong>), it's not the only way to measure health. If you are asking yourself, "<strong>am i fat quiz</strong>", calculating your BMI is a scientific first step. However, considering other metrics like <strong>hip vs waist</strong> ratio or learning <strong>how to measure waist men</strong> and women correctly can provide a more complete picture of your body composition. For clinical diagnosis, doctors may refer to medical codes like <strong>underweight icd 10</strong> for underweight individuals, or use an <strong>adolescence test</strong> to evaluate teenage growth charts.
        </p>
        <p>
          <em>Remember: A healthy BMI typically falls within the <strong>18.5/25</strong> range. Always consult a healthcare professional for personalized medical advice.</em>
        </p>
      </div>
    </div>
  );
}
