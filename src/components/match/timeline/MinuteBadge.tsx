interface MinuteBadgeProps {
  minute: string;
  isGoal: boolean;
}

export default function MinuteBadge({ minute, isGoal }: MinuteBadgeProps) {
  return (
    <div
      className={`flex items-center justify-center min-w-[36px] h-[22px] rounded-full text-xs font-normal px-5 py-0.5 z-10 ${
        isGoal
          ? "bg-secondary text-bg-surface"
          : "bg-bg-muted text-text-white/90"
      }`}
    >
      {minute}
    </div>
  );
}
