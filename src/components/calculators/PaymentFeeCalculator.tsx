'use client';

import { useState, useMemo } from 'react';

export default function PaymentFeeCalculator() {
  const [gateway, setGateway] = useState<'stripe' | 'paypal' | 'square'>('stripe');
  
  const [invoiceAmount, setInvoiceAmount] = useState('100.00');
  const [transactionType, setTransactionType] = useState<'domestic' | 'international'>('domestic');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach'>('card');

  const results = useMemo(() => {
    const amount = parseFloat(invoiceAmount);
    if (isNaN(amount) || amount <= 0) return null;

    let percentageFee = 0;
    let fixedFee = 0;

    // Based on standard 2024 US pricing
    if (gateway === 'stripe') {
      if (paymentMethod === 'card') {
        percentageFee = transactionType === 'domestic' ? 2.9 : 4.4; // +1.5% for intl
        fixedFee = 0.30;
      } else if (paymentMethod === 'ach') {
        percentageFee = 0.8;
        fixedFee = 0.00; // Stripe caps ACH at $5
      }
    } else if (gateway === 'paypal') {
      // PayPal Goods & Services (Online checkout)
      if (paymentMethod === 'card') {
        percentageFee = transactionType === 'domestic' ? 3.49 : 4.99; // +1.5% for intl
        fixedFee = 0.49;
      } else {
        // PayPal invoicing
        percentageFee = 3.49;
        fixedFee = 0.49;
      }
    } else if (gateway === 'square') {
      // Square Online
      if (paymentMethod === 'card') {
        percentageFee = 2.9;
        fixedFee = 0.30;
      } else {
        percentageFee = 1.0;
        fixedFee = 0.00;
      }
    }

    let totalFees = (amount * (percentageFee / 100)) + fixedFee;
    
    // Cap Stripe ACH at $5
    if (gateway === 'stripe' && paymentMethod === 'ach' && totalFees > 5.00) {
      totalFees = 5.00;
      percentageFee = (5.00 / amount) * 100; // effective rate
    }

    const netAmount = amount - totalFees;
    
    // Calculate how much you SHOULD charge to get exactly `amount`
    // Target = (Charge - fixed) * (1 - percent)
    // Charge = (Target + fixed) / (1 - percent)
    const amountToCharge = (amount + fixedFee) / (1 - (percentageFee / 100));

    return {
      percentageFee,
      fixedFee,
      totalFees,
      netAmount,
      amountToCharge
    };
  }, [gateway, invoiceAmount, transactionType, paymentMethod]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4 overflow-x-auto">
        <button
          onClick={() => setGateway('stripe')}
          className={`font-semibold whitespace-nowrap ${gateway === 'stripe' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Stripe
        </button>
        <button
          onClick={() => setGateway('paypal')}
          className={`font-semibold whitespace-nowrap ${gateway === 'paypal' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          PayPal
        </button>
        <button
          onClick={() => setGateway('square')}
          className={`font-semibold whitespace-nowrap ${gateway === 'square' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Square
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Invoice / Sale Amount</label>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
              <div className="px-4 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
              <input type="number" value={invoiceAmount} onChange={(e) => setInvoiceAmount(e.target.value)} className="w-full px-4 py-2 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as 'card'|'ach')} className="w-full px-4 py-2 bg-white border border-border rounded-lg">
                <option value="card">Credit/Debit Card</option>
                <option value="ach">ACH / Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Customer Location</label>
              <select value={transactionType} onChange={(e) => setTransactionType(e.target.value as 'domestic'|'international')} className="w-full px-4 py-2 bg-white border border-border rounded-lg">
                <option value="domestic">Domestic (US)</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 border border-border rounded-lg text-sm text-text-muted">
            Calculating based on standard {gateway.charAt(0).toUpperCase() + gateway.slice(1)} online processing rates.
          </div>

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className="bg-result-bg rounded-xl p-6 border border-success text-center">
                <h3 className="text-lg font-semibold text-text-primary mb-2">You Will Receive</h3>
                <div className="text-5xl font-mono font-bold text-success mb-2">
                  ${results.netAmount.toFixed(2)}
                </div>
                <p className="text-sm text-text-muted font-medium">
                  After ${results.totalFees.toFixed(2)} in total fees.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 border border-border rounded-lg">
                  <span className="text-sm font-medium text-text-primary">Standard Fee Rate</span>
                  <span className="font-mono text-text-primary font-semibold">
                    {gateway === 'stripe' && paymentMethod === 'ach' && results.totalFees === 5 ? 'Capped at $5.00' : `${results.percentageFee.toFixed(2)}% + $${results.fixedFee.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="p-4 bg-surface border border-border rounded-lg text-center">
                  <div className="text-sm text-text-muted mb-1">How much should you invoice?</div>
                  <div className="text-xs text-text-muted mb-2 px-4">To receive exactly <strong>${parseFloat(invoiceAmount).toFixed(2)}</strong> in your bank account, you need to charge your customer:</div>
                  <div className="font-mono font-semibold text-accent text-xl">
                    ${results.amountToCharge.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your invoice amount to calculate exact payment gateway fees.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Understanding Payment Processing Costs</h2>
        <p>
          Accepting credit cards online is essential for modern business, but standard gateway fees (like 2.9% + 30¢) can quickly eat into your margins if you don't account for them in your pricing. If you use a dedicated <strong>stripe fee calculator</strong>, you can automatically figure out exactly how much you need to increase your invoice by to receive your target net amount.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">How to Calculate Stripe Fees</h3>
        <p>
          You don't need a complex spreadsheet to <strong>calculate stripe fees</strong>. Whether you are using a <strong>stripe fees calculator</strong> for domestic cards, international transactions, or low-cost ACH transfers, the math remains the same. ACH transfers are particularly beneficial for high-ticket invoices because Stripe caps the ACH fee at a maximum of $5.00, saving you hundreds of dollars compared to a standard 2.9% credit card swipe.
        </p>
      </div>
    </div>
  );
}
