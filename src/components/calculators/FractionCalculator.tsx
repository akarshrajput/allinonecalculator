'use client';

import { useState, useMemo } from 'react';
import { calculateFraction, FractionInputs } from '@/lib/calculators/fraction';

export default function FractionCalculator() {
  const [num1, setNum1] = useState('1');
  const [den1, setDen1] = useState('2');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [num2, setNum2] = useState('1');
  const [den2, setDen2] = useState('4');

  const results = useMemo(() => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) return null;
    if (d1 === 0 || d2 === 0) return null; // Divide by zero

    return calculateFraction({
      num1: n1,
      den1: d1,
      operation,
      num2: n2,
      den2: d2
    });
  }, [num1, den1, operation, num2, den2]);

  const opSymbol = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷'
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          
          {/* Fraction 1 */}
          <div className="flex flex-col items-center w-24">
            <input 
              type="number" 
              value={num1} 
              onChange={(e) => setNum1(e.target.value)} 
              className="w-full text-center text-2xl py-2 px-1 border-b-2 border-border font-mono rounded-t-md focus:outline-none focus:bg-gray-50"
            />
            <input 
              type="number" 
              value={den1} 
              onChange={(e) => setDen1(e.target.value)} 
              className="w-full text-center text-2xl py-2 px-1 font-mono rounded-b-md focus:outline-none focus:bg-gray-50 mt-1"
            />
          </div>

          {/* Operation */}
          <select 
            value={operation} 
            onChange={(e) => setOperation(e.target.value as any)} 
            className="text-2xl font-bold text-accent bg-transparent border-none focus:ring-0 cursor-pointer"
          >
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>

          {/* Fraction 2 */}
          <div className="flex flex-col items-center w-24">
            <input 
              type="number" 
              value={num2} 
              onChange={(e) => setNum2(e.target.value)} 
              className="w-full text-center text-2xl py-2 px-1 border-b-2 border-border font-mono rounded-t-md focus:outline-none focus:bg-gray-50"
            />
            <input 
              type="number" 
              value={den2} 
              onChange={(e) => setDen2(e.target.value)} 
              className="w-full text-center text-2xl py-2 px-1 font-mono rounded-b-md focus:outline-none focus:bg-gray-50 mt-1"
            />
          </div>

        </div>

        <div className="mt-12">
          {results ? (
            <div className="bg-result-bg rounded-xl p-8 border border-success flex flex-col items-center">
              <h3 className="text-lg font-semibold text-text-primary mb-6">Result</h3>
              
              <div className="flex items-center space-x-6 text-success">
                
                {/* Simplified Result */}
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-mono font-bold">{results.resultNum}</div>
                  {results.resultDen !== 1 && (
                    <>
                      <div className="w-full h-1 bg-success my-1 rounded-full"></div>
                      <div className="text-4xl font-mono font-bold">{results.resultDen}</div>
                    </>
                  )}
                </div>

                {/* Mixed Number Result if applicable */}
                {results.isMixed && (
                  <>
                    <div className="text-3xl text-text-muted font-bold">=</div>
                    <div className="flex items-center">
                      <div className="text-5xl font-mono font-bold mr-2">{results.mixedWhole}</div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-mono font-bold">{results.mixedNum}</div>
                        <div className="w-full h-1 bg-success my-1 rounded-full"></div>
                        <div className="text-3xl font-mono font-bold">{results.mixedDen}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-8 text-text-muted font-mono bg-white px-4 py-2 rounded-lg border border-border">
                Decimal: {results.decimal}
              </div>
            </div>
          ) : (
            <div className="p-6 border border-dashed border-border rounded-xl bg-gray-50 text-text-muted text-center">
              Enter valid fractions to calculate. Denominators cannot be zero.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
