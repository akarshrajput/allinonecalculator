'use client';

import { useState, useMemo } from 'react';

export default function FlooringCalculator() {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  // Imperial
  const [lengthFt, setLengthFt] = useState('12');
  const [widthFt, setWidthFt] = useState('10');
  
  // Metric
  const [lengthM, setLengthM] = useState('4');
  const [widthM, setWidthM] = useState('3');

  const [wastePercentage, setWastePercentage] = useState('10');
  const [pricePerUnit, setPricePerUnit] = useState('2.50');

  const results = useMemo(() => {
    let area = 0;
    
    if (unitSystem === 'imperial') {
      const l = parseFloat(lengthFt);
      const w = parseFloat(widthFt);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return null;
      area = l * w; // sq ft
    } else {
      const l = parseFloat(lengthM);
      const w = parseFloat(widthM);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return null;
      area = l * w; // sq m
    }

    const waste = parseFloat(wastePercentage) || 0;
    const price = parseFloat(pricePerUnit) || 0;

    const wasteMultiplier = 1 + (waste / 100);
    const totalArea = area * wasteMultiplier;
    const totalCost = totalArea * price;

    return {
      netArea: area,
      totalArea,
      totalCost,
      wasteAmount: totalArea - area
    };
  }, [unitSystem, lengthFt, widthFt, lengthM, widthM, wastePercentage, pricePerUnit]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`font-semibold ${unitSystem === 'imperial' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Imperial (Feet)
        </button>
        <button
          onClick={() => setUnitSystem('metric')}
          className={`font-semibold ${unitSystem === 'metric' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Metric (Meters)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {unitSystem === 'imperial' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Room Length (ft)</label>
                  <input type="number" value={lengthFt} onChange={(e) => setLengthFt(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Room Width (ft)</label>
                  <input type="number" value={widthFt} onChange={(e) => setWidthFt(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Room Length (m)</label>
                  <input type="number" value={lengthM} onChange={(e) => setLengthM(e.target.value)} className="w-full px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">Room Width (m)</label>
                  <input type="number" value={widthM} onChange={(e) => setWidthM(e.target.value)} className="w-full px-4 py-2" />
                </div>
              </>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Waste Factor (%)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden">
              <input type="number" value={wastePercentage} onChange={(e) => setWastePercentage(e.target.value)} className="w-full px-4 py-2 outline-none" />
              <div className="px-4 py-2 bg-gray-50 border-l border-border text-text-muted">%</div>
            </div>
            <p className="text-xs text-text-muted mt-1">Standard recommendation is 10% for cuts and mistakes.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Price per {unitSystem === 'imperial' ? 'Sq Ft' : 'Sq M'} ($)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
              <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} className="w-full px-4 py-2 outline-none" />
            </div>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Total Materials Needed</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  {results.totalArea.toFixed(1)} <span className="text-sm font-sans text-text-muted font-medium">{unitSystem === 'imperial' ? 'sq ft' : 'sq m'}</span>
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Includes {results.wasteAmount.toFixed(1)} {unitSystem === 'imperial' ? 'sq ft' : 'sq m'} for waste.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Net Room Area</div>
                  <div className="font-mono font-semibold text-text-primary text-lg">
                    {results.netArea.toFixed(1)} <span className="text-xs">{unitSystem === 'imperial' ? 'sq ft' : 'sq m'}</span>
                  </div>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Estimated Cost</div>
                  <div className="font-mono font-semibold text-accent text-lg">
                    ${results.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter room dimensions to calculate flooring needs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
