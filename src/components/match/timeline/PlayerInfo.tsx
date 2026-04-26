interface PlayerInfoProps {
  name: string;
  detail?: string;
  align: "left" | "right";
}

export default function PlayerInfo({ name, detail, align }: PlayerInfoProps) {
  return (
    <div className={`text-${align}`}>
      <div className="text-sm font-medium text-text-white leading-tight">
        {name}
      </div>
      {detail && (
        <div className="text-xs text-text-white/40 leading-tight">{detail}</div>
      )}
    </div>
  );
}
