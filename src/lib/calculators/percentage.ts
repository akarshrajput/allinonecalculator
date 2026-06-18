export function calculatePercentageOf(percentage: number, value: number): number {
  return (percentage / 100) * value;
}

export function calculateIsWhatPercentage(part: number, whole: number): number {
  if (whole === 0) return 0;
  return (part / whole) * 100;
}

export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return ((newValue - oldValue) / oldValue) * 100;
}
