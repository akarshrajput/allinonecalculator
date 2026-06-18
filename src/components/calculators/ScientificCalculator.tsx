'use client';

import { useState, useRef, useEffect } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isError, setIsError] = useState(false);

  // Safe evaluation using constrained Function constructor
  const safeEvaluate = (expr: string) => {
    try {
      // Replace symbols with JS Math equivalents
      let parsed = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(');

      // Simple sanitization: only allow numbers, math operators, Math functions, and parens
      if (/[^0-9\.\+\-\*\/\%\(\)\sMath\.\w]/.test(parsed) && !parsed.includes('PI') && !parsed.includes('E')) {
        throw new Error('Invalid characters');
      }

      // eslint-disable-next-line no-new-func
      const result = new Function(`return ${parsed}`)();
      
      if (!isFinite(result) || isNaN(result)) {
        throw new Error('Math Error');
      }

      return Number(result.toFixed(10)).toString(); // Fix floating point issues
    } catch (e) {
      setIsError(true);
      return 'Error';
    }
  };

  const handlePress = (val: string) => {
    if (isError) {
      setDisplay(val);
      setEquation('');
      setIsError(false);
      return;
    }

    if (display === '0' && !['.', '+', '-', '×', '÷', '^', '%'].includes(val)) {
      setDisplay(val);
    } else {
      setDisplay(prev => prev + val);
    }
  };

  const handleFunction = (func: string) => {
    if (isError) {
      setDisplay(`${func}(`);
      setIsError(false);
      return;
    }
    if (display === '0') {
      setDisplay(`${func}(`);
    } else {
      setDisplay(prev => prev + `${func}(`);
    }
  };

  const calculate = () => {
    if (!display) return;
    setEquation(display);
    const result = safeEvaluate(display);
    setDisplay(result);
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setIsError(false);
  };

  const deleteLast = () => {
    if (isError) {
      clear();
      return;
    }
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-sm max-w-md mx-auto">
      {/* Display Area */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6 flex flex-col items-end justify-end min-h-[100px] break-all border border-border">
        <div className="text-sm text-text-muted mb-1 h-5">{equation}</div>
        <div className={`text-4xl font-mono ${isError ? 'text-red-500' : 'text-text-primary'}`}>
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {/* Row 1 */}
        <button onClick={() => handleFunction('sin')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">sin</button>
        <button onClick={() => handleFunction('cos')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">cos</button>
        <button onClick={() => handleFunction('tan')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">tan</button>
        <button onClick={() => handlePress('(')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">(</button>
        <button onClick={() => handlePress(')')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">)</button>

        {/* Row 2 */}
        <button onClick={() => handleFunction('log')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">log</button>
        <button onClick={() => handleFunction('ln')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">ln</button>
        <button onClick={() => handleFunction('sqrt')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">√</button>
        <button onClick={() => handlePress('^')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">^</button>
        <button onClick={() => handlePress('%')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">%</button>

        {/* Row 3 */}
        <button onClick={() => handlePress('π')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">π</button>
        <button onClick={() => handlePress('7')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">7</button>
        <button onClick={() => handlePress('8')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">8</button>
        <button onClick={() => handlePress('9')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">9</button>
        <button onClick={() => handlePress('÷')} className="p-3 bg-accent text-white hover:bg-blue-600 rounded text-lg font-bold transition">÷</button>

        {/* Row 4 */}
        <button onClick={() => handlePress('e')} className="p-3 bg-gray-50 hover:bg-gray-200 rounded text-sm font-semibold text-text-muted transition">e</button>
        <button onClick={() => handlePress('4')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">4</button>
        <button onClick={() => handlePress('5')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">5</button>
        <button onClick={() => handlePress('6')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">6</button>
        <button onClick={() => handlePress('×')} className="p-3 bg-accent text-white hover:bg-blue-600 rounded text-lg font-bold transition">×</button>

        {/* Row 5 */}
        <button onClick={deleteLast} className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded text-sm font-bold transition">DEL</button>
        <button onClick={() => handlePress('1')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">1</button>
        <button onClick={() => handlePress('2')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">2</button>
        <button onClick={() => handlePress('3')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">3</button>
        <button onClick={() => handlePress('-')} className="p-3 bg-accent text-white hover:bg-blue-600 rounded text-lg font-bold transition">-</button>

        {/* Row 6 */}
        <button onClick={clear} className="p-3 bg-red-100 text-red-600 hover:bg-red-200 rounded text-sm font-bold transition">AC</button>
        <button onClick={() => handlePress('0')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary col-span-2 transition">0</button>
        <button onClick={() => handlePress('.')} className="p-3 bg-white border border-border hover:bg-gray-100 rounded text-lg font-bold text-text-primary transition">.</button>
        <button onClick={() => handlePress('+')} className="p-3 bg-accent text-white hover:bg-blue-600 rounded text-lg font-bold transition">+</button>
        
        {/* Equal button spanning bottom */}
        <button onClick={calculate} className="col-span-5 mt-2 p-4 bg-success text-white hover:bg-green-600 rounded-lg text-2xl font-bold transition shadow-sm">
          =
        </button>
      </div>
    </div>
  );
}
