'use client';

import { useState, useMemo } from 'react';

export default function PaintingCalculator() {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  // Dimensions
  const [length, setLength] = useState('12');
  const [width, setWidth] = useState('10');
  const [height, setHeight] = useState('8');
  
  // Doors & Windows
  const [doors, setDoors] = useState('1'); // avg 21 sq ft per door
  const [windows, setWindows] = useState('2'); // avg 15 sq ft per window

  // Paint specifics
  const [coats, setCoats] = useState('2');
  const [pricePerGallon, setPricePerGallon] = useState('45.00');

  const results = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) return null;

    // Total wall area = 2 * (length * height) + 2 * (width * height)
    let grossWallArea = 2 * (l * h) + 2 * (w * h);

    // Subtract doors and windows
    const dCount = parseInt(doors) || 0;
    const wCount = parseInt(windows) || 0;

    let doorArea = 0;
    let windowArea = 0;
    let coveragePerUnit = 0; // standard coverage is 350-400 sq ft per gallon. Metric: ~10 sq m per liter

    if (unitSystem === 'imperial') {
      doorArea = dCount * 21; // sq ft
      windowArea = wCount * 15; // sq ft
      coveragePerUnit = 350; // sq ft per gallon
    } else {
      doorArea = dCount * 1.95; // sq m
      windowArea = wCount * 1.4; // sq m
      coveragePerUnit = 10; // sq m per liter
    }

    let netWallArea = grossWallArea - doorArea - windowArea;
    if (netWallArea < 0) netWallArea = 0;

    const totalCoats = parseInt(coats) || 1;
    const totalAreaToPaint = netWallArea * totalCoats;

    const paintNeeded = totalAreaToPaint / coveragePerUnit;
    const roundedPaintNeeded = Math.ceil(paintNeeded); // Always buy whole gallons/liters

    const price = parseFloat(pricePerGallon) || 0;
    const totalCost = roundedPaintNeeded * price;

    return {
      netWallArea,
      paintNeeded,
      roundedPaintNeeded,
      totalCost
    };
  }, [unitSystem, length, width, height, doors, windows, coats, pricePerGallon]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => setUnitSystem('imperial')}
          className={`font-semibold ${unitSystem === 'imperial' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Imperial (Feet / Gallons)
        </button>
        <button
          onClick={() => setUnitSystem('metric')}
          className={`font-semibold ${unitSystem === 'metric' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Metric (Meters / Liters)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-semibold text-text-primary border-b border-border pb-2">1. Room Dimensions</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Length</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Width</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Height</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full px-3 py-2 text-sm" />
            </div>
          </div>

          <h4 className="font-semibold text-text-primary border-b border-border pb-2">2. Doors & Windows</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Number of Doors</label>
              <input type="number" value={doors} onChange={(e) => setDoors(e.target.value)} className="w-full px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Number of Windows</label>
              <input type="number" value={windows} onChange={(e) => setWindows(e.target.value)} className="w-full px-4 py-2" />
            </div>
          </div>

          <h4 className="font-semibold text-text-primary border-b border-border pb-2">3. Paint Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Number of Coats</label>
              <select value={coats} onChange={(e) => setCoats(e.target.value)} className="w-full px-4 py-2">
                <option value="1">1 Coat</option>
                <option value="2">2 Coats (Recommended)</option>
                <option value="3">3 Coats</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Price per {unitSystem === 'imperial' ? 'Gallon' : 'Liter'} ($)
              </label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden">
                <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                <input type="number" value={pricePerGallon} onChange={(e) => setPricePerGallon(e.target.value)} className="w-full px-3 py-2 outline-none" />
              </div>
            </div>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Paint Required</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  {results.roundedPaintNeeded} <span className="text-sm font-sans text-text-muted font-medium">{unitSystem === 'imperial' ? 'Gallons' : 'Liters'}</span>
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Exact calculation: {results.paintNeeded.toFixed(2)} {unitSystem === 'imperial' ? 'gal' : 'L'}. We rounded up to the nearest whole container.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Net Paintable Area</div>
                  <div className="font-mono font-semibold text-text-primary text-lg">
                    {results.netWallArea.toFixed(1)} <span className="text-xs">{unitSystem === 'imperial' ? 'sq ft' : 'sq m'}</span>
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
              Enter room dimensions to calculate painting needs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
