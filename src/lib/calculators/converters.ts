export const lengthUnits = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  miles: 1609.34,
  yards: 0.9144,
  feet: 0.3048,
  inches: 0.0254
};

export const weightUnits = {
  kilograms: 1,
  grams: 0.001,
  milligrams: 0.000001,
  metricTons: 1000,
  pounds: 0.453592,
  ounces: 0.0283495,
  stones: 6.35029
};

export const areaUnits = {
  squareMeters: 1,
  squareKilometers: 1000000,
  squareCentimeters: 0.0001,
  squareMillimeters: 0.000001,
  hectares: 10000,
  acres: 4046.86,
  squareMiles: 2589988.11,
  squareYards: 0.836127,
  squareFeet: 0.092903,
  squareInches: 0.00064516
};

export const volumeUnits = {
  liters: 1,
  milliliters: 0.001,
  cubicMeters: 1000,
  cubicCentimeters: 0.001,
  gallonsUS: 3.78541,
  quartsUS: 0.946353,
  pintsUS: 0.473176,
  cupsUS: 0.24, // roughly 240ml
  fluidOuncesUS: 0.0295735,
  tablespoonsUS: 0.0147868,
  teaspoonsUS: 0.00492892
};

export function convert(value: number, fromUnit: string, toUnit: string, conversionMap: Record<string, number>): number {
  if (fromUnit === toUnit) return value;
  // Convert to base unit (where value is 1)
  const baseValue = value * conversionMap[fromUnit];
  // Convert from base to target
  return baseValue / conversionMap[toUnit];
}

export function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  
  let celsius = value;
  
  // First to Celsius
  if (from === 'fahrenheit') {
    celsius = (value - 32) * 5/9;
  } else if (from === 'kelvin') {
    celsius = value - 273.15;
  }

  // Then to Target
  if (to === 'celsius') return celsius;
  if (to === 'fahrenheit') return (celsius * 9/5) + 32;
  if (to === 'kelvin') return celsius + 273.15;

  return value;
}
