'use client';

import { useState, useMemo } from 'react';
import { convertTemperature } from '@/lib/calculators/converters';

export default function TemperatureConverter() {
  const [value, setValue] = useState('0');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');

  const unitOptions = [
    { value: 'celsius', label: 'Celsius (°C)' },
    { value: 'fahrenheit', label: 'Fahrenheit (°F)' },
    { value: 'kelvin', label: 'Kelvin (K)' }
  ];

  const result = useMemo(() => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;

    return convertTemperature(num, fromUnit, toUnit);
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
                className="bg-gray-50 border-l border-border px-3 outline-none text-sm font-medium min-w-[140px]"
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
                {result !== null ? (result % 1 !== 0 ? result.toFixed(4).replace(/\.?0+$/, '') : result) : '-'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="bg-gray-50 border-l border-border px-3 outline-none text-sm font-medium min-w-[140px]"
              >
                {unitOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-text-muted mb-4 uppercase tracking-wider">Quick Conversions for {value || 0} {fromUnit}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {unitOptions.filter(u => u.value !== fromUnit).map(opt => {
              const num = parseFloat(value || '0');
              const converted = convertTemperature(num, fromUnit, opt.value);
              const displayVal = converted % 1 !== 0 ? converted.toFixed(2).replace(/\.?0+$/, '') : converted;
              
              return (
                <div key={opt.value} className="bg-gray-50 p-4 rounded-lg border border-border flex justify-between items-center">
                  <div className="text-sm font-medium text-text-primary">{opt.label}</div>
                  <div className="text-xl font-mono font-bold text-accent">{displayVal}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
