'use client';

import { useState, useMemo } from 'react';

export default function PaceCalculator() {
  const [distance, setDistance] = useState('5');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'mi'>('km');
  
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('0');

  const presetDistances = [
    { label: '5K', val: '5', unit: 'km' },
    { label: '10K', val: '10', unit: 'km' },
    { label: 'Half Marathon', val: '13.1', unit: 'mi' },
    { label: 'Marathon', val: '26.2', unit: 'mi' }
  ];

  const results = useMemo(() => {
    const d = parseFloat(distance);
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;

    if (isNaN(d) || d <= 0) return null;

    const totalSeconds = (h * 3600) + (m * 60) + s;
    if (totalSeconds <= 0) return null;

    // Conversions
    const distMiles = distanceUnit === 'mi' ? d : d * 0.621371;
    const distKm = distanceUnit === 'km' ? d : d * 1.60934;

    // Pace in seconds per unit
    const secondsPerMile = totalSeconds / distMiles;
    const secondsPerKm = totalSeconds / distKm;

    // Speed in units per hour
    const mph = distMiles / (totalSeconds / 3600);
    const kph = distKm / (totalSeconds / 3600);

    // Format pace (e.g. 5:30)
    const formatPace = (totalSecs: number) => {
      const paceMins = Math.floor(totalSecs / 60);
      const paceSecs = Math.round(totalSecs % 60);
      return `${paceMins}:${paceSecs.toString().padStart(2, '0')}`;
    };

    return {
      pacePerMile: formatPace(secondsPerMile),
      pacePerKm: formatPace(secondsPerKm),
      mph,
      kph
    };
  }, [distance, distanceUnit, hours, minutes, seconds]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Race / Distance Presets</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {presetDistances.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setDistance(preset.val);
                    setDistanceUnit(preset.unit as 'km' | 'mi');
                  }}
                  className="px-3 py-1.5 text-xs bg-gray-50 hover:bg-gray-100 border border-border rounded-lg transition-colors font-medium text-text-primary"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium text-text-muted mb-1">Custom Distance</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <input type="number" step="0.1" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full px-4 py-2 outline-none" />
              <select value={distanceUnit} onChange={(e) => setDistanceUnit(e.target.value as 'km'|'mi')} className="bg-gray-50 border-l border-border px-4 py-2 outline-none text-text-muted font-medium">
                <option value="km">Kilometers</option>
                <option value="mi">Miles</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium text-text-muted mb-3">Total Time / Goal Time</label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1 text-center">Hours</label>
                <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} min="0" className="w-full px-3 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent text-center" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1 text-center">Minutes</label>
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} min="0" max="59" className="w-full px-3 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent text-center" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1 text-center">Seconds</label>
                <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} min="0" max="59" className="w-full px-3 py-2 bg-white border border-border rounded-lg outline-none focus:ring-2 focus:ring-accent text-center" />
              </div>
            </div>
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Required Average Pace</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-4xl font-mono font-bold text-success mb-1">
                      {results.pacePerMile}
                    </div>
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wide">Min / Mile</div>
                  </div>
                  <div className="border-l border-green-200">
                    <div className="text-4xl font-mono font-bold text-success mb-1">
                      {results.pacePerKm}
                    </div>
                    <div className="text-xs font-semibold text-text-muted uppercase tracking-wide">Min / Km</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Speed (MPH)</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    {results.mph.toFixed(2)} <span className="text-sm">mph</span>
                  </div>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Speed (KPH)</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    {results.kph.toFixed(2)} <span className="text-sm">km/h</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border border-border rounded-lg text-sm text-text-muted">
                To complete a {distance} {distanceUnit} run in {hours > '0' ? `${hours}h ` : ''}{minutes}m {seconds}s, you must maintain an average pace of exactly {distanceUnit === 'mi' ? results.pacePerMile : results.pacePerKm} per {distanceUnit === 'mi' ? 'mile' : 'kilometer'}.
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your distance and goal time to calculate your required running pace.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
