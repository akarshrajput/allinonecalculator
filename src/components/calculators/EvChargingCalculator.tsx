'use client';

import { useState, useMemo } from 'react';

export default function EvChargingCalculator() {
  // Battery specs
  const [batteryCapacity, setBatteryCapacity] = useState('75'); // kWh (Tesla Model 3 LR avg)
  const [currentCharge, setCurrentCharge] = useState('20'); // %
  const [targetCharge, setTargetCharge] = useState('80'); // %
  
  // Costs
  const [location, setLocation] = useState<'home' | 'public'>('home');
  const [homeRate, setHomeRate] = useState('0.16'); // $/kWh
  const [publicRate, setPublicRate] = useState('0.45'); // $/kWh

  // Efficiency & Gas Comparison
  const [evEfficiency, setEvEfficiency] = useState('3.5'); // miles per kWh
  const [gasMpg, setGasMpg] = useState('28'); // miles per gallon
  const [gasPrice, setGasPrice] = useState('3.50'); // $/gallon

  const results = useMemo(() => {
    const capacity = parseFloat(batteryCapacity);
    const start = parseFloat(currentCharge);
    const end = parseFloat(targetCharge);

    if (isNaN(capacity) || isNaN(start) || isNaN(end) || start < 0 || end > 100 || start >= end) return null;

    // Energy needed
    const percentNeeded = end - start;
    let kwhNeeded = capacity * (percentNeeded / 100);

    // Charging efficiency loss (usually around 10% lost as heat)
    kwhNeeded = kwhNeeded * 1.10; 

    // Cost
    const rate = location === 'home' ? parseFloat(homeRate) : parseFloat(publicRate);
    if (isNaN(rate)) return null;

    const totalCost = kwhNeeded * rate;

    // Range added
    const efficiency = parseFloat(evEfficiency) || 3.5;
    const rangeAdded = (capacity * (percentNeeded / 100)) * efficiency;

    // Gas equivalent cost
    const mpg = parseFloat(gasMpg) || 28;
    const pricePerGallon = parseFloat(gasPrice) || 3.50;
    
    // How much would `rangeAdded` miles cost in a gas car?
    const gasCost = (rangeAdded / mpg) * pricePerGallon;
    const savings = gasCost - totalCost;

    return {
      kwhNeeded,
      totalCost,
      rangeAdded,
      gasCost,
      savings
    };
  }, [batteryCapacity, currentCharge, targetCharge, location, homeRate, publicRate, evEfficiency, gasMpg, gasPrice]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <h4 className="font-semibold text-text-primary border-b border-border pb-2">1. Vehicle Battery</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Capacity (kWh)</label>
              <input type="number" value={batteryCapacity} onChange={(e) => setBatteryCapacity(e.target.value)} className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Current %</label>
              <input type="number" value={currentCharge} onChange={(e) => setCurrentCharge(e.target.value)} className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Target %</label>
              <input type="number" value={targetCharge} onChange={(e) => setTargetCharge(e.target.value)} className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm" />
            </div>
          </div>

          <h4 className="font-semibold text-text-primary border-b border-border pb-2 mt-6">2. Charging Location & Cost</h4>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setLocation('home')}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${location === 'home' ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent'}`}
            >
              Home Charging
            </button>
            <button
              onClick={() => setLocation('public')}
              className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${location === 'public' ? 'bg-accent text-white border-accent' : 'bg-white text-text-muted border-border hover:border-accent'}`}
            >
              Public Fast Charger
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">
              {location === 'home' ? 'Home Electricity Rate ($/kWh)' : 'Public Charger Rate ($/kWh)'}
            </label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <div className="px-4 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
              <input type="number" step="0.01" value={location === 'home' ? homeRate : publicRate} onChange={(e) => location === 'home' ? setHomeRate(e.target.value) : setPublicRate(e.target.value)} className="w-full px-4 py-2 outline-none" />
            </div>
          </div>

          <h4 className="font-semibold text-text-primary border-b border-border pb-2 mt-6">3. Gas Comparison (Optional)</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">EV (mi/kWh)</label>
              <input type="number" step="0.1" value={evEfficiency} onChange={(e) => setEvEfficiency(e.target.value)} className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Gas (MPG)</label>
              <input type="number" value={gasMpg} onChange={(e) => setGasMpg(e.target.value)} className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1">Gas Price ($)</label>
              <input type="number" step="0.01" value={gasPrice} onChange={(e) => setGasPrice(e.target.value)} className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm" />
            </div>
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Total Charging Cost</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  ${results.totalCost.toFixed(2)}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  {results.kwhNeeded.toFixed(1)} kWh needed (includes 10% efficiency loss).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Driving Range Added</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    ~{results.rangeAdded.toFixed(0)} <span className="text-sm">miles</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg text-center border ${results.savings > 0 ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  <div className="text-sm mb-1">{results.savings > 0 ? 'Savings vs Gas' : 'Loss vs Gas'}</div>
                  <div className="font-mono font-semibold text-xl">
                    ${Math.abs(results.savings).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-border rounded-lg text-sm text-text-muted">
                To drive {results.rangeAdded.toFixed(0)} miles in a {gasMpg} MPG gas car at ${gasPrice}/gal would cost you <strong>${results.gasCost.toFixed(2)}</strong>.
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your EV battery details and electricity rates to calculate charging costs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
