'use client';

import { useState, useMemo } from 'react';

export default function SocialMediaRevenueCalculator() {
  const [platform, setPlatform] = useState<'youtube' | 'tiktok'>('youtube');
  
  // Views
  const [dailyViews, setDailyViews] = useState('10000');
  
  // RPM (Revenue Per Mille)
  const [rpm, setRpm] = useState('4.50');

  const results = useMemo(() => {
    const views = parseInt(dailyViews);
    const rate = parseFloat(rpm);

    if (isNaN(views) || isNaN(rate) || views < 0 || rate < 0) return null;

    // RPM = Revenue per 1,000 views
    const dailyRevenue = (views / 1000) * rate;
    const monthlyRevenue = dailyRevenue * 30; // approx 30 days
    const yearlyRevenue = dailyRevenue * 365;

    return {
      dailyRevenue,
      monthlyRevenue,
      yearlyRevenue,
      totalViewsMonthly: views * 30,
      totalViewsYearly: views * 365
    };
  }, [dailyViews, rpm]);

  const setPresetRpm = (preset: number) => {
    setRpm(preset.toString());
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => { setPlatform('youtube'); setRpm('4.50'); }}
          className={`font-semibold ${platform === 'youtube' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          YouTube (AdSense)
        </button>
        <button
          onClick={() => { setPlatform('tiktok'); setRpm('0.03'); }}
          className={`font-semibold ${platform === 'tiktok' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          TikTok (Creativity Program)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Daily Views</label>
            <input type="number" value={dailyViews} onChange={(e) => setDailyViews(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg" />
            <p className="text-xs text-text-muted mt-1">Average views across all eligible videos per day.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Estimated RPM ($ per 1,000 views)</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <div className="px-4 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
              <input type="number" step="0.01" value={rpm} onChange={(e) => setRpm(e.target.value)} className="w-full px-4 py-2 outline-none" />
            </div>
          </div>

          {platform === 'youtube' ? (
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Common YouTube RPM Niches</label>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setPresetRpm(1.50)} className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-border rounded-full">Gaming ($1.50)</button>
                <button onClick={() => setPresetRpm(4.50)} className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-border rounded-full">Vlogs/Lifestyle ($4.50)</button>
                <button onClick={() => setPresetRpm(8.00)} className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-border rounded-full">Tech/Reviews ($8.00)</button>
                <button onClick={() => setPresetRpm(15.00)} className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-border rounded-full">Finance/Business ($15.00+)</button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">TikTok RPM Varies Greatly</label>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setPresetRpm(0.02)} className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-border rounded-full">Creator Fund ($0.02)</button>
                <button onClick={() => setPresetRpm(0.50)} className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-border rounded-full">Creativity Beta ($0.50)</button>
                <button onClick={() => setPresetRpm(1.00)} className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 border border-border rounded-full">High Value US ($1.00)</button>
              </div>
              <p className="text-xs text-text-muted mt-2">Only "Qualified Views" (watched \u003E 5 secs) count towards TikTok revenue.</p>
            </div>
          )}

        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Estimated Monthly Income</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  ${results.monthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  Based on {results.totalViewsMonthly.toLocaleString()} monthly views.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Daily Income</div>
                  <div className="font-mono font-semibold text-text-primary text-xl">
                    ${results.dailyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">Yearly Income</div>
                  <div className="font-mono font-semibold text-accent text-xl">
                    ${results.yearlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                <strong>Disclaimer:</strong> This is a rough estimation. Actual RPM fluctuates wildly based on audience location (US/UK vs India/Brazil), viewer age, watch time, and time of year (e.g., Q4 pays much higher ad rates).
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your daily views and estimated RPM to see your potential revenue.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Calculating Creator Earnings</h2>
        <p>
          "<strong>How much does a YouTuber make?</strong>" and "<strong>How much do TikTokers make?</strong>" are two of the most searched questions on the internet. While it might seem like magic, it is entirely based on RPM (Revenue Per Mille). By using our <strong>youtube channel revenue calculator</strong>, you can easily discover exactly <strong>how much does</strong> a creator earn per thousand views.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">YouTube Income Breakdowns</h3>
        <p>
          If you are wondering <strong>how much money do you get per view on YouTube</strong> (or <strong>how much money do you make per view on youtube</strong>), the answer is a fraction of a cent. You need volume. Our <strong>youtube views to money calculator</strong> lets you model different scenarios. For instance, hitting <strong>1 million views on youtube money</strong> in a high-paying finance niche can net you $15,000, while a gaming channel might only make $1,500 for those same million views. 
        </p>
        <p>
          Whether you need a full <strong>youtube video revenue calculator</strong> for long-form content, a dedicated <strong>youtube shorts revenue calculator</strong> for short-form (set the RPM to $0.05), or simply want to <strong>calculate youtube channel revenue</strong> for a competitor using our <strong>youtube video money calculator</strong>, this interface handles it all.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">TikTok Creator Program Alternatives</h3>
        <p>
          TikTok monetization has changed drastically from the original Creator Fund to the new Creativity Program. If you want to know <strong>how much does TikTok pay</strong> today, a standard <strong>tiktok revenue calculator</strong> is much more reliable than guessing. Many users search for third-party platforms like <strong>TikLeap</strong> (sometimes misspelled as <strong>TickLeap</strong>) or go directly to <strong>tikleap com</strong> to check a <strong>tiktok follower count</strong> and estimate earnings. Our native calculator provides the exact same math natively without leaving the page.
        </p>
      </div>
    </div>
  );
}
