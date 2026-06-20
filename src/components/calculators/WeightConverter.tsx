'use client';

import { useState, useMemo } from 'react';
import { weightUnits, convert } from '@/lib/calculators/converters';

export default function WeightConverter() {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('pounds');
  const [toUnit, setToUnit] = useState('kilograms');

  const unitOptions = Object.keys(weightUnits).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
  }));

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;

    return convert(num, fromUnit, toUnit, weightUnits);
  }, [value, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-text-muted mb-1">From</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-4 py-3 outline-none"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="bg-gray-50 border-l border-border px-3 outline-none text-sm font-medium"
              >
                {unitOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            onClick={handleSwap}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full text-text-muted transition md:mt-6"
            title="Swap Units"
          >
            ⇄
          </button>

          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-text-muted mb-1">To</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden">
              <div className="w-full px-4 py-3 bg-gray-50 font-mono font-medium overflow-x-auto">
                {result !== null ? (result % 1 !== 0 ? result.toFixed(6).replace(/\.?0+$/, '') : result) : '-'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="bg-gray-50 border-l border-border px-3 outline-none text-sm font-medium"
              >
                {unitOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">Quick Conversions for {value || 1} {fromUnit}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {unitOptions.filter(u => u.value !== fromUnit).slice(0, 8).map(opt => {
              const num = parseFloat(value || '1');
              const converted = convert(num, fromUnit, opt.value, weightUnits);
              const displayVal = converted % 1 !== 0 ? converted.toFixed(4).replace(/\.?0+$/, '') : converted;
              
              return (
                <div key={opt.value} className="bg-gray-50 p-3 rounded-lg border border-border">
                  <div className="text-xs text-text-muted mb-1">{opt.label}</div>
                  <div className="font-mono font-medium break-all">{displayVal}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Advanced SEO Semantic Content Block */}
        <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
          <h2 className="text-xl font-bold text-text-primary">Common Weight Conversions</h2>
          <p>
            Whether you need to figure out exactly how much <strong>152 lb to kg</strong> is, or you're converting <strong>153 lbs in kg</strong> (or even <strong>153 lb to kg</strong>), our tool handles it instantly. Users frequently use this calculator to convert larger weights like <strong>191 pounds in kg</strong>, <strong>195 lbs in kg</strong>, <strong>215 lbs in kilograms</strong>, <strong>227 lbs to kg</strong> (or <strong>227 pounds in kg</strong>), <strong>245 pounds to kg</strong>, and <strong>246 lbs to kg</strong>.
          </p>
          <p>
            You can also seamlessly convert metric weights back to imperial. For example, calculating <strong>27.5 kg lbs</strong> (or <strong>27.5 pounds to kg</strong> depending on your needs), finding what <strong>47.5 kilos pounds</strong> equals, or doing precise decimal conversions like <strong>54.5 kg to lbs</strong>, <strong>68.2 kg to lbs</strong>, <strong>88.9 kg to lbs</strong>, and even small amounts like <strong>6.2 kg lbs</strong>.
          </p>
          <p>
            No matter if you're trying to find out what <strong>72 kg</strong> is in pounds, converting exactly <strong>152 pounds to kg</strong>, <strong>161 lbs kg</strong> (<strong>161 pounds to kg</strong>), <strong>166 lbs in kg</strong>, <strong>169 pounds in kg</strong>, or even larger conversions like <strong>222 kg to lbs</strong> and <strong>222lbs to kg</strong>, this tool provides instant, accurate results. For international users converting <strong>65 pounds to us</strong> metrics, simply select your desired output unit above.
          </p>
        </div>

      </div>
    </div>
  );
}
