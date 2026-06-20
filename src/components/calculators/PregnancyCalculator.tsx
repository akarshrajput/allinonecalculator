'use client';

import { useState, useMemo } from 'react';
import { calculatePregnancy, PregnancyInputs } from '@/lib/calculators/pregnancy';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function PregnancyCalculator() {
  const [method, setMethod] = useState<PregnancyInputs['calcMethod']>('lmp');
  const [inputDate, setInputDate] = useState<string>('');
  const [ivfType, setIvfType] = useState<'3day' | '5day'>('5day');

  const results = useMemo(() => {
    if (!inputDate) return null;
    const d = new Date(inputDate);
    if (isNaN(d.getTime())) return null;

    return calculatePregnancy({
      calcMethod: method,
      date: d,
      ivfType: method === 'ivf' ? ivfType : undefined
    });
  }, [method, inputDate, ivfType]);

  const methodLabels = {
    lmp: 'First Day of Last Period',
    conception: 'Date of Conception',
    ultrasound: 'Ultrasound Estimated Due Date',
    ivf: 'IVF Transfer Date'
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-border mb-6 pb-4">
        {['lmp', 'conception', 'ultrasound', 'ivf'].map(m => (
          <button
            key={m}
            onClick={() => setMethod(m as any)}
            className={`font-semibold px-3 py-1 rounded-full text-sm ${method === m ? 'bg-accent text-white' : 'bg-gray-100 text-text-muted hover:bg-gray-200'}`}
          >
            {m === 'lmp' ? 'Last Period' : m === 'conception' ? 'Conception Date' : m === 'ultrasound' ? 'Ultrasound EDD' : 'IVF Transfer'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">{methodLabels[method]}</label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full px-4 py-2"
            />
          </div>

          {method === 'ivf' && (
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Embryo Age</label>
              <select value={ivfType} onChange={(e) => setIvfType(e.target.value as any)} className="w-full px-4 py-2">
                <option value="3day">Day 3 Embryo</option>
                <option value="5day">Day 5 Embryo</option>
              </select>
            </div>
          )}
        </div>

        <div>
          {results ? (
            <div className="space-y-4">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">Estimated Due Date</h3>
                <div className="text-3xl font-display font-bold text-success mb-2">
                  {results.estimatedDueDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  {results.daysRemaining} days remaining!
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ResultDisplay 
                  label="Gestational Age" 
                  value={`${results.gestationalAgeWeeks}w ${results.gestationalAgeDays}d`} 
                />
                <ResultDisplay 
                  label="Trimester" 
                  value={results.gestationalAgeWeeks <= 0 ? 'N/A' : `Trimester ${results.trimester}`} 
                />
              </div>

              <div className="p-4 bg-surface border border-border rounded-lg flex justify-between items-center">
                <span className="font-medium text-sm text-text-muted">Estimated Conception Date</span>
                <span className="font-semibold text-text-primary text-sm">
                  {results.conceptionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Please select a calculation method and enter a date.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Understanding Your Pregnancy Timeline</h2>
        <p>
          Keeping track of gestational age often involves a lot of math! Expectant parents frequently use this tool to answer specific timeline questions like: <strong>how many weeks is 4 months</strong>, <strong>how many months is 9 weeks</strong>, or converting <strong>11 weeks is how many months</strong>. You can use our calculator to figure out exactly what date marks <strong>40 weeks from now</strong> (or exactly <strong>what is 40 weeks from today</strong>), which is the standard human gestation period. 
        </p>
        <p>
          You can also reverse engineer your timeline. For example, calculating dates from <strong>10 weeks ago</strong>, <strong>15 weeks ago</strong>, <strong>34 weeks ago from today</strong>, or even <strong>40 weeks ago from today</strong> to pinpoint conception. If you are tracking milestones, you can easily find out <strong>what is 24 weeks from today</strong>, exactly when <strong>27 weeks from today</strong> is, or look further ahead to <strong>42 weeks from today</strong> (or even <strong>11 months from today</strong> for post-partum planning).
        </p>
        <p>
          Often, users just want to know how their current week translates to months or days. Common checks include: <strong>how long is 7 weeks</strong>, <strong>7 weeks from now</strong>, <strong>how long is 14 weeks</strong>, <strong>how long is 15 weeks</strong>, <strong>how long is 19 weeks</strong>, <strong>how long is 21 weeks</strong>, <strong>how long is 22 weeks</strong>, <strong>how long is 25 weeks</strong>, <strong>how long is 30 weeks</strong>, <strong>how long is 32 weeks</strong>, and understanding <strong>39 weeks in months</strong>.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Cycles, IVF, and Clinical Tools</h3>
        <p>
          Before conception, many users rely on a <strong>period calculator</strong> or <strong>menstrual cycle period calculator</strong> to <strong>calculate next menstrual period</strong> dates, which leads to questions like "<strong>how can you know when your ovulating</strong>?". Once conceived, clinical accuracy matters. Our tool functions much like a digital <strong>ob wheel</strong> or the <strong>pregnancy due date calculator nhs</strong> provides. For assisted reproduction, this serves as an accurate <strong>ivf pregnancy due date calculator</strong> (or <strong>pregnancy calculator ivf</strong>). If you suspect you might be expecting, you might first need a <strong>when can i do a pregnancy test calculator</strong> to confirm before tracking your due date!
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">A Note on Animal Gestation</h3>
        <p>
          While our calculator is built exclusively for human pregnancies, we recognize many pet owners and farmers search for gestation tracking. If you need a <strong>dog pregnancy calculator</strong> (or <strong>calculator dog pregnancy</strong> / <strong>pregnancy in dogs calculator</strong> / <strong>canine pregnancy calculator</strong> / <strong>puppy pregnancy calculator</strong>), a <strong>cat pregnancy calculator</strong> (or <strong>feline pregnancy calculator</strong>), or livestock tools like a <strong>cow pregnancy calculator</strong> (or <strong>cattle pregnancy calculator</strong>) and <strong>goat pregnancy calculator</strong>, please note that those animals have drastically different gestational periods than humans and require specialized veterinary tools!
        </p>
      </div>
    </div>
  );
}
