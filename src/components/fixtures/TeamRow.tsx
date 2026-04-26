import TeamBadge from "../ui/TeamBadge";

interface TeamRowProps {
  badge: string | null;
  name: string;
  redCards?: number;
  tag?: string;
  aggScore?: string;
  score?: string;
  hasScore: boolean;
}

export default function TeamRow({
  badge,
  name,
  redCards,
  tag,
  aggScore,
  score,
  hasScore,
}: TeamRowProps) {
  return (
    <div className="flex items-center gap-2.5">
      <TeamBadge src={badge} alt={name} size="sm" />
      <span className="text-sm text-text-primary font-medium truncate">
        {name}
      </span>

      {!!redCards && redCards > 0 && (
        <div
          className="w-2 h-3 bg-red-accent rounded-sm shrink-0 animate-pulse"
          title={`${redCards} Red Card(s)`}
        />
      )}
      {tag && (
        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-secondary/5 rounded-2xl text-[10px] font-semibold text-secondary shrink-0">
          <span className="text-[8px]">✓</span> {tag}
        </div>
      )}

      <div className="flex-1" />

      {aggScore && (
        <span className="text-xs text-text-muted mr-1 tabular-nums">
          [{aggScore}]
        </span>
      )}
      {hasScore && (
        <span className="text-sm font-bold text-text-primary tabular-nums w-5 text-right">
          {score}
        </span>
      )}
    </div>
  );
}
