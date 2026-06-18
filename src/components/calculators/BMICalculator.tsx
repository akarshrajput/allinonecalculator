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
    </div>
  );
}
