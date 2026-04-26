interface PeriodSeparatorProps {
  label: string;
  score?: string;
}

export default function PeriodSeparator({ label, score }: PeriodSeparatorProps) {
  return (
    <div className="relative flex items-center justify-center z-10">
      <div className="absolute inset-x-0 top-1/2 h-px bg-text-white/10" />
      <div className="relative bg-bg-surface px-4 flex items-center gap-3">
        <span className="text-sm font-normal text-text-white/80">{label}</span>
        {score && (
          <span className="text-sm font-medium text-text-white">{score}</span>
        )}
      </div>
    </div>
  );
}
