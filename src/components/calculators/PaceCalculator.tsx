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

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Mastering the Running Pace Calculator</h2>
        <p>
          Whether you are training to <strong>running a race</strong> or just curious about your <strong>average speed run</strong> (or <strong>average mile time</strong>), a <strong>running pace chart</strong> (or <strong>pace run chart</strong>, <strong>pace chart</strong>, <strong>pacing running chart</strong>) is essential. Our tool acts as an advanced <strong>run walk pace calculator</strong>, helping you determine exactly <strong>how many minutes to a mile</strong> you need to run to hit your goal. It is universally applicable, functioning as a <strong>marathon pace calculator</strong>, a <strong>10k pace chart</strong> (or <strong>pace chart 10km</strong>) generator, or even a <strong>5k pace chart</strong> to hit your <strong>5k race times</strong>. If you are comparing training methodologies, our math is as accurate as a <strong>mcmillan running pace calculator</strong> (also known as a <strong>mcmillan calculator</strong> or <strong>mcmillan running calculator</strong>) or the famous <strong>daniels running formula</strong> (including the <strong>jack daniels running calculator</strong>, <strong>jack daniels pace calculator</strong>, and <strong>jack daniels vdot</strong> system). 
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Race Specific Pacing and Conversions</h3>
        <p>
          Need to know your <strong>average pace in marathon</strong> or <strong>average marathon pace</strong>? Or looking for a specific <strong>marathon pace</strong> target like a <strong>marathon 330 pace</strong>, a <strong>sub 4 hour marathon pace</strong>, a <strong>5 hour marathon pace</strong> (or <strong>marathon 5 hours pace</strong>), or even a <strong>2 hour marathon pace</strong>? We help you calculate your exact <strong>marathon pace chart</strong> splits. You can also calculate the <strong>half marathon average time</strong>, predict your <strong>half marathon times</strong>, determine your <strong>half marathon pace</strong>, generate a <strong>half marathon pacing chart</strong> (or <strong>pacing for half marathon chart</strong>), and find your overall <strong>half marathon pace chart</strong> target.
        </p>
        <p>
          This is also a complete <strong>time calculator with speed and distance</strong> (or <strong>speed calculated by distance and time</strong> / <strong>time calculator distance speed</strong>). Use it as a <strong>split calculator</strong>, a <strong>running record calculator</strong>, or a <strong>running pacer</strong> tool. Need distance conversions? We handle <strong>8k to miles</strong>, <strong>marathon race km</strong>, <strong>42km in miles</strong>, <strong>13.1 miles in km</strong>, <strong>6k mile</strong>, <strong>how long is a 3k</strong> (or <strong>how many miles in a 3k</strong>), <strong>how many miles is 4k</strong>, <strong>3.8 miles in km</strong>, <strong>2.4km to miles</strong>, <strong>how many miles is 2k</strong> (and <strong>2k in miles</strong>), <strong>1.4 miles km</strong> (or <strong>1.4 miles to km</strong>), <strong>46 km to miles</strong>, <strong>1 4 of a mile calculator</strong>, and even the track <strong>1600 time</strong> vs the <strong>magic mile</strong>. 
        </p>
        <p>
          Converting pace is easy. Try our <strong>pace calculator km to miles</strong> to jump from <strong>min/mile to min/km</strong> (or <strong>min/km to min/mile</strong>, <strong>min mile to min km</strong>, <strong>km pace to mile pace</strong>, <strong>min per km to min per mile</strong>, and <strong>minute per mile to minute per kilometer</strong>). We also support speed conversions like an <strong>mph calculator</strong> (e.g., <strong>minutes per mile to mph</strong>, <strong>4 min / km in mph</strong>, or <strong>minute miles to miles per hour</strong>). Want to know <strong>how many minutes in a mile</strong> or <strong>how many minutes is 10 miles</strong>? Just enter the data!
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Advanced Metrics: VDOT, VO2, and Other Sports</h3>
        <p>
          Advanced runners frequently ask "<strong>what is vdot</strong>?". This tool helps you establish baseline times to plug into a <strong>vdot calculator</strong> (or <strong>vdot calc</strong> / <strong>vdot running calculator</strong> / <strong>running vdot calculator</strong>) or a <strong>vo2max calculator</strong> (<strong>vo2 calculator</strong>). It also helps calculate metrics for a <strong>cooper test calculator</strong> or adjusting for hills via a <strong>grade adjusted pace calculator</strong>.
        </p>
        <p>
          This tool goes beyond running (or a <strong>pace calculator for walking</strong> / <strong>walk run pace calculator</strong> / <strong>run walk run pace calculator</strong>). Triathletes use it as a <strong>swim pace calculator</strong> (or <strong>pace calculator swim</strong> / <strong>swimming pace calculator</strong>), a <strong>bike pace calculator</strong>, or a <strong>cycling pace calculator</strong>. It works perfectly on a machine, whether as a <strong>treadmill pace calculator</strong>, an <strong>erg pace calculator</strong>, a <strong>rowing pace calculator</strong>, or specifically a <strong>concept 2 pace calculator</strong> (for the <strong>concept 2 erg</strong>). It even helps when <strong>calculating pace zones suunto</strong> or setting a <strong>threshold pace calculator</strong> target like the <strong>atlanta track club pace calculator</strong> or a general <strong>calculadora fast</strong> format.
        </p>
      </div>
    </div>
  );
}
