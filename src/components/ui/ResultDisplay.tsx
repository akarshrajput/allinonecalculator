interface ResultDisplayProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  subValue?: string;
}

export default function ResultDisplay({ label, value, highlight = false, subValue }: ResultDisplayProps) {
  return (
    <div className={`p-4 rounded-xl border ${highlight ? 'bg-result-bg border-success' : 'bg-surface border-border'}`}>
      <div className="text-sm font-medium text-text-muted mb-1">{label}</div>
      <div className={`font-mono text-2xl md:text-3xl font-bold ${highlight ? 'text-success' : 'text-text-primary'}`}>
        {value}
      </div>
      {subValue && (
        <div className="mt-1 text-xs text-text-muted">
          {subValue}
        </div>
      )}
    </div>
  );
}
