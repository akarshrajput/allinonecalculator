'use client';

import { useState, useMemo } from 'react';
import { calculateDebtPayoff, DebtItem } from '@/lib/calculators/debtPayoff';
import ResultDisplay from '@/components/ui/ResultDisplay';

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: '1', name: 'Credit Card A', balance: 5000, interestRate: 18.9, minimumPayment: 150 },
    { id: '2', name: 'Car Loan', balance: 15000, interestRate: 6.5, minimumPayment: 300 }
  ]);
  const [extraPayment, setExtraPayment] = useState<string>('200');
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');

  const addDebt = () => {
    setDebts([...debts, { id: Math.random().toString(), name: `Debt ${debts.length + 1}`, balance: 0, interestRate: 0, minimumPayment: 0 }]);
  };

  const updateDebt = (id: string, field: keyof DebtItem, value: string) => {
    setDebts(debts.map(d => {
      if (d.id === id) {
        return { ...d, [field]: field === 'name' ? value : (parseFloat(value) || 0) };
      }
      return d;
    }));
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const results = useMemo(() => {
    const validDebts = debts.filter(d => d.balance > 0 && d.interestRate > 0);
    if (validDebts.length === 0) return null;

    return calculateDebtPayoff({
      debts: validDebts,
      extraMonthlyPayment: parseFloat(extraPayment) || 0,
      strategy
    });
  }, [debts, extraPayment, strategy]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex space-x-4 border-b border-border pb-4">
            <button
              onClick={() => setStrategy('avalanche')}
              className={`font-semibold ${strategy === 'avalanche' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
            >
              Avalanche (Highest Interest First)
            </button>
            <button
              onClick={() => setStrategy('snowball')}
              className={`font-semibold ${strategy === 'snowball' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
            >
              Snowball (Lowest Balance First)
            </button>
          </div>

          <div className="space-y-4">
            {debts.map((debt, index) => (
              <div key={debt.id} className="p-4 border border-border rounded-lg bg-gray-50 relative">
                <button 
                  onClick={() => removeDebt(debt.id)}
                  className="absolute top-2 right-2 text-text-muted hover:text-red-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="grid grid-cols-2 gap-4 mb-3 pr-6">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-text-muted mb-1">Debt Name</label>
                    <input type="text" value={debt.name} onChange={e => updateDebt(debt.id, 'name', e.target.value)} className="w-full px-3 py-1.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Balance</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-text-muted text-sm">$</span>
                      <input type="number" value={debt.balance || ''} onChange={e => updateDebt(debt.id, 'balance', e.target.value)} className="w-full pl-6 pr-2 py-1.5 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-muted mb-1">Interest Rate</label>
                    <div className="relative">
                      <input type="number" step="0.1" value={debt.interestRate || ''} onChange={e => updateDebt(debt.id, 'interestRate', e.target.value)} className="w-full pr-6 pl-2 py-1.5 text-sm" />
                      <span className="absolute right-2 top-1.5 text-text-muted text-sm">%</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-text-muted mb-1">Minimum Payment</label>
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-text-muted text-sm">$</span>
                      <input type="number" value={debt.minimumPayment || ''} onChange={e => updateDebt(debt.id, 'minimumPayment', e.target.value)} className="w-full pl-6 pr-2 py-1.5 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addDebt} className="w-full py-2 border-2 border-dashed border-accent text-accent rounded-lg font-medium hover:bg-accent-light transition">
              + Add Another Debt
            </button>
          </div>

          <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium text-text-muted mb-1">Extra Monthly Payment (Towards strategy)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-text-muted">$</span>
              <input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="w-full pl-8 pr-4 py-2"
              />
            </div>
          </div>
        </div>

        <div>
          {results ? (
             <div className="space-y-4 h-full flex flex-col">
               <div className="bg-result-bg rounded-xl p-6 border border-success">
                 <h3 className="text-lg font-semibold text-text-primary mb-2">Debt-Free Date</h3>
                 <div className="text-4xl font-mono font-bold text-success mb-2">
                   {results.payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                 </div>
                 <p className="text-sm text-text-muted">
                   {Math.floor(results.totalMonthsToPayoff / 12)} years and {results.totalMonthsToPayoff % 12} months from now.
                 </p>
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <ResultDisplay 
                   label="Total Interest Paid" 
                   value={`$${results.totalInterestPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                 />
                 <ResultDisplay 
                   label="Total Starting Balance" 
                   value={`$${results.totalStartingBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
                 />
               </div>
               
               <div className="mt-4 p-4 border border-border rounded-lg bg-surface flex-grow">
                 <h4 className="font-semibold text-text-primary mb-2">How {strategy === 'avalanche' ? 'Avalanche' : 'Snowball'} Works</h4>
                 <p className="text-sm text-text-muted">
                   {strategy === 'avalanche' 
                     ? 'You pay the minimum on all debts, and put all extra money towards the debt with the highest interest rate first. This saves you the most money in interest overall.'
                     : 'You pay the minimum on all debts, and put all extra money towards the debt with the smallest balance first. This gives you quick wins and builds momentum.'}
                 </p>
               </div>
             </div>
          ) : (
             <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Add your debts above to calculate your payoff date.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Mastering Your Debt Payoff Strategy</h2>
        <p>
          Managing multiple balances can be overwhelming. Rather than relying on a complex <strong>debt payoff calculator excel</strong> sheet or building your own <strong>debt payoff calculator google sheets</strong> file from scratch, this intuitive tool automatically models your exact payoff timeline. It completely replaces the need for a manual <strong>debt payoff snowball calculator spreadsheet</strong> (or any static <strong>debt payoff calculator spreadsheet</strong>), giving you dynamic updates as you tweak your extra monthly payments.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Financial Advisor Frameworks</h3>
        <p>
          Depending on whose financial philosophy you follow, you can use this tool to model their specific debt destruction methods:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-6">
          <li>
            <strong>The Dave Ramsey Method:</strong> If you are looking for a <strong>dave ramsey debt payoff calculator</strong> (also searched as <strong>ramsey debt payoff calculator</strong> or <strong>debt payoff calculator dave ramsey</strong>), simply toggle the strategy to "Snowball". The <strong>debt snowball payoff calculator</strong> method attacks the smallest balance first to build emotional momentum, exactly as prescribed in the Baby Steps.
          </li>
          <li>
            <strong>The Ramit Sethi Method:</strong> If you prefer the mathematically optimal route and are searching for a <strong>ramit debt payoff calculator</strong> (or <strong>ramit sethi debt payoff calculator</strong> / <strong>debt payoff calculator ramit</strong>), toggle the strategy to "Avalanche". This attacks the highest interest rate first, saving you the absolute maximum amount of money and time.
          </li>
        </ul>

        <h3 className="text-lg font-bold text-text-primary mt-6">Optimizing Credit Card Debt</h3>
        <p>
          High-interest revolving debt is notoriously difficult to escape. By using this tool as your primary <strong>credit card debt calculator payoff</strong> tracker, you can immediately see the devastating impact of 18%+ interest rates and exactly how many months you shave off your timeline by adding just an extra $50 or $100 per month. Whether you use the avalanche or the <strong>debt payoff snowball calculator</strong> method, consistency is your greatest asset.
        </p>
      </div>
    </div>
  );
}
