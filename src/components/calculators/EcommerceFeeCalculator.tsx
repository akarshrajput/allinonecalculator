'use client';

import { useState, useMemo } from 'react';

export default function EcommerceFeeCalculator() {
  const [platform, setPlatform] = useState<'etsy' | 'shopify'>('etsy');
  
  // Sale details
  const [sellingPrice, setSellingPrice] = useState('25.00');
  const [shippingCharged, setShippingCharged] = useState('5.00');
  
  // Cost details
  const [itemCost, setItemCost] = useState('8.00');
  const [shippingCost, setShippingCost] = useState('4.50');
  
  // Optional Etsy ads
  const [offsiteAds, setOffsiteAds] = useState('0'); // 0, 12, or 15

  const results = useMemo(() => {
    const price = parseFloat(sellingPrice) || 0;
    const shippingRev = parseFloat(shippingCharged) || 0;
    const iCost = parseFloat(itemCost) || 0;
    const sCost = parseFloat(shippingCost) || 0;

    const totalRevenue = price + shippingRev;
    const totalCosts = iCost + sCost;

    if (totalRevenue <= 0) return null;

    let platformFees = 0;
    let paymentProcessingFees = 0;
    let adFees = 0;

    if (platform === 'etsy') {
      // Etsy fees (as of late 2023/2024 standards)
      // 1. Listing fee: $0.20
      const listingFee = 0.20;
      
      // 2. Transaction fee: 6.5% of (price + shipping charged)
      const transactionFee = totalRevenue * 0.065;

      // 3. Payment processing (US standard): 3% + $0.25
      paymentProcessingFees = (totalRevenue * 0.03) + 0.25;

      // 4. Offsite Ads
      const adsPercent = parseFloat(offsiteAds) || 0;
      adFees = totalRevenue * (adsPercent / 100);

      platformFees = listingFee + transactionFee;
    } else {
      // Shopify basic (assuming Shopify Payments online)
      // No listing or transaction fee if using Shopify payments
      // Payment processing (US basic plan): 2.9% + $0.30
      paymentProcessingFees = (totalRevenue * 0.029) + 0.30;
      platformFees = 0; // Standard monthly subscription isn't calculated per item
    }

    const totalFees = platformFees + paymentProcessingFees + adFees;
    const netProfit = totalRevenue - totalCosts - totalFees;
    const profitMargin = (netProfit / totalRevenue) * 100;

    return {
      totalRevenue,
      totalCosts,
      platformFees,
      paymentProcessingFees,
      adFees,
      totalFees,
      netProfit,
      profitMargin
    };
  }, [platform, sellingPrice, shippingCharged, itemCost, shippingCost, offsiteAds]);

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="flex space-x-4 border-b border-border mb-6 pb-4">
        <button
          onClick={() => setPlatform('etsy')}
          className={`font-semibold ${platform === 'etsy' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Etsy
        </button>
        <button
          onClick={() => setPlatform('shopify')}
          className={`font-semibold ${platform === 'shopify' ? 'text-accent border-b-2 border-accent pb-1' : 'text-text-muted hover:text-text-primary'}`}
        >
          Shopify (Basic)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          
          <h4 className="font-semibold text-text-primary border-b border-border pb-2">1. Revenue (What Customer Pays)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Selling Price</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className="w-full px-3 py-2 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Shipping Charged</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                <input type="number" value={shippingCharged} onChange={(e) => setShippingCharged(e.target.value)} className="w-full px-3 py-2 outline-none" />
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-text-primary border-b border-border pb-2 mt-6">2. Costs (What You Pay)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Item/Material Cost</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                <input type="number" value={itemCost} onChange={(e) => setItemCost(e.target.value)} className="w-full px-3 py-2 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Actual Shipping Cost</label>
              <div className="flex bg-white border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-accent">
                <div className="px-3 py-2 bg-gray-50 border-r border-border text-text-muted">$</div>
                <input type="number" value={shippingCost} onChange={(e) => setShippingCost(e.target.value)} className="w-full px-3 py-2 outline-none" />
              </div>
            </div>
          </div>

          {platform === 'etsy' && (
            <>
              <h4 className="font-semibold text-text-primary border-b border-border pb-2 mt-6">3. Etsy Specifics</h4>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">Offsite Ads Fee</label>
                <select value={offsiteAds} onChange={(e) => setOffsiteAds(e.target.value)} className="w-full px-4 py-2 bg-white border border-border rounded-lg">
                  <option value="0">None (0%)</option>
                  <option value="15">Standard - \u003C$10k/yr (15%)</option>
                  <option value="12">High Volume - \u003E$10k/yr (12%)</option>
                </select>
                <p className="text-xs text-text-muted mt-1">If the buyer clicked an offsite ad before purchasing.</p>
              </div>
            </>
          )}

        </div>

        <div>
          {results ? (
            <div className="space-y-6">
              <div className={`rounded-xl p-6 border text-center ${results.netProfit > 0 ? 'bg-result-bg border-success' : 'bg-red-50 border-red-300'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${results.netProfit > 0 ? 'text-text-primary' : 'text-red-800'}`}>Net Profit</h3>
                <div className={`text-5xl font-mono font-bold mb-2 ${results.netProfit > 0 ? 'text-success' : 'text-red-600'}`}>
                  ${results.netProfit.toFixed(2)}
                </div>
                <p className={`text-sm font-medium ${results.netProfit > 0 ? 'text-text-muted' : 'text-red-700'}`}>
                  {results.profitMargin.toFixed(1)}% Profit Margin
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 border border-border rounded-lg">
                  <span className="text-sm font-medium text-text-primary">Total Customer Pays</span>
                  <span className="font-mono text-text-primary font-semibold">
                    ${results.totalRevenue.toFixed(2)}
                  </span>
                </div>
                
                <div className="p-4 bg-surface border border-border rounded-lg space-y-2">
                  <div className="text-sm font-semibold text-text-primary border-b border-border pb-1 mb-2">Fee Breakdown</div>
                  {results.platformFees > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Platform Fees</span>
                      <span className="font-mono text-red-500">-${results.platformFees.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Payment Processing</span>
                    <span className="font-mono text-red-500">-${results.paymentProcessingFees.toFixed(2)}</span>
                  </div>
                  {results.adFees > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">Ad Fees</span>
                      <span className="font-mono text-red-500">-${results.adFees.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-semibold pt-1 border-t border-border mt-1">
                    <span>Total Fees</span>
                    <span className="font-mono text-red-600">-${results.totalFees.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 border border-border rounded-lg">
                  <span className="text-sm text-text-muted">Your Material & Shipping Costs</span>
                  <span className="font-mono text-red-500">
                    -${results.totalCosts.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter your item price and costs to calculate your exact ecommerce profit.
            </div>
          )}
        </div>
      </div>

      {/* Advanced SEO Semantic Content Block */}
      <div className="mt-12 pt-8 border-t border-border prose prose-sm max-w-none text-text-muted">
        <h2 className="text-xl font-bold text-text-primary">Understanding Seller Margins</h2>
        <p>
          Whether you are selling handmade goods or dropping shipping, knowing exactly what platforms charge is critical to survival. If you don't use a dedicated <strong>ecommerce profit calculator</strong>, you might be losing money on every sale. This tool functions natively as an <strong>etsy fee calculator</strong> and a <strong>shopify fee calculator</strong>, automatically factoring in the most common payment processing gateways.
        </p>
        
        <h3 className="text-lg font-bold text-text-primary mt-6">Alternative Marketplaces & Processors</h3>
        <p>
          While Etsy has a strict 6.5% transaction cut (often calculated via a specific <strong>etsy transaction fee calculator</strong>), other platforms vary wildly. We are actively expanding this tool to serve as an <strong>ebay fee calculator 2025</strong> to handle eBay's latest promoted listing changes, as well as an <strong>fba fee calculator</strong> for Amazon fulfillment costs. 
        </p>
        <p>
          If you sell independently off-platform, your margins depend entirely on your payment gateway. You can use the baseline numbers here as a proxy for a <strong>stripe fee calculator</strong> or <strong>square fee calculator</strong> (typically 2.9% + 30¢). P2P services act differently; a <strong>venmo fee calculator</strong> or <strong>cash app fee calculator</strong> for business profiles usually charges slightly less but lacks advanced fraud protection.
        </p>

        <h3 className="text-lg font-bold text-text-primary mt-6">Automotive & Real Estate Fees</h3>
        <p>
          <em>Looking for non-ecommerce calculators?</em> Many users land here looking to calculate fees for large assets. If you are buying salvage vehicles, you will need a specialized <strong>copart fee calculator</strong> (or <strong>copart fees calculator</strong>) which scales heavily based on bid price. To get it street legal, you must check local DMV sites rather than an ecommerce tool—such as a <strong>florida vehicle registration fee calculator</strong> or a <strong>michigan registration fee calculator</strong>. Similarly, if you are buying a home with military benefits, you need a dedicated <strong>va funding fee calculator</strong>, which is tied to your loan amount and down payment, not digital merchant processing.
        </p>
      </div>
    </div>
  );
}
