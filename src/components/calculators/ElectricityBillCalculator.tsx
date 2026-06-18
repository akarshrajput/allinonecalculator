'use client';

import { useState, useMemo } from 'react';

export default function ElectricityBillCalculator() {
  // Input fields
  const [powerWatts, setPowerWatts] = useState('1500'); // Standard space heater
  const [hoursPerDay, setHoursPerDay] = useState('4');
  const [costPerKwh, setCostPerKwh] = useState('0.16'); // US avg is around $0.16/kWh

  const results = useMemo(() => {
    const watts = parseFloat(powerWatts);
    const hours = parseFloat(hoursPerDay);
    const cost = parseFloat(costPerKwh);

    if (isNaN(watts) || isNaN(hours) || isNaN(cost) || watts < 0 || hours < 0 || cost < 0) return null;

    // Daily kWh = (Watts * Hours) / 1000
    const dailyKwh = (watts * hours) / 1000;
    const dailyCost = dailyKwh * cost;

    // Monthly (approx 30 days)
    const monthlyKwh = dailyKwh * 30;
    const monthlyCost = dailyCost * 30;

    // Yearly (365 days)
    const yearlyKwh = dailyKwh * 365;
    const yearlyCost = dailyCost * 365;

    return {
      dailyKwh,
      dailyCost,
      monthlyKwh,
      monthlyCost,
      yearlyKwh,
      yearlyCost
    };
  }, [powerWatts, hoursPerDay, costPerKwh]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <p className="text-sm text-text-muted">
            Find out exactly how much a specific appliance costs to run. Check the back/bottom of your appliance for its Wattage (W).
          </p>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Power Consumption (Watts)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input
                type="number"
                value={powerWatts}
                onChange={(e) => setPowerWatts(e.target.value)}
                className="w-full px-4 py-2 outline-none"
              />
              <div className="px-4 py-2 bg-gray-50 border-l border-border text-text-muted font-medium">W</div>
            </div>
            <p className="text-xs text-text-muted mt-1">e.g., 60W lightbulb, 1500W space heater.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Usage per Day (Hours)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input
                type="number"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
                className="w-full px-4 py-2 outline-none"
                max="24"
              />
              <div className="px-4 py-2 bg-gray-50 border-l border-border text-text-muted font-medium">hrs</div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Electricity Cost ($ per kWh)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <div className="px-4 py-2 bg-gray-50 border-r border-border text-text-muted font-medium">$</div>
              <input
                type="number"
                step="0.01"
                value={costPerKwh}
                onChange={(e) => setCostPerKwh(e.target.value)}
                className="w-full px-4 py-2 outline-none"
              />
            </div>
            <p className="text-xs text-text-muted mt-1">The US average is ~$0.16 per kWh.</p>
          </div>
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Monthly Cost</h3>
                <div className="text-4xl font-mono font-bold text-success mb-2">
                  ${results.monthlyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Energy used: {results.monthlyKwh.toFixed(1)} kWh / month
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Daily Cost</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    ${results.dailyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-text-muted mt-1">{results.dailyKwh.toFixed(2)} kWh</div>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Yearly Cost</div>
                  <div className="font-mono font-semibold text-accent text-xl">
                    ${results.yearlyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-xs text-text-muted mt-1">{results.yearlyKwh.toFixed(0)} kWh</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter appliance wattage and usage hours to calculate electricity costs.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
