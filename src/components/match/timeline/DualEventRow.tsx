import type { TimelineEvent } from "../../../types";
import EventIcon from "./EventIcon";
import MinuteBadge from "./MinuteBadge";
import PlayerInfo from "./PlayerInfo";

export default function DualEventRow({
  minute,
  homeEvent,
  awayEvent,
}: {
  minute: string;
  homeEvent: TimelineEvent;
  awayEvent: TimelineEvent;
}) {
  return (
    <div className="relative flex items-center w-full min-h-[48px] z-10 gap-3">
      <div className="flex-1 flex items-center justify-end gap-3">
        <PlayerInfo
          name={homeEvent.playerName}
          detail={homeEvent.assistOrDetail}
          align="right"
        />
        <EventIcon type={homeEvent.type} />
      </div>

      <div className="flex items-center justify-center w-[100px] shrink-0 gap-1">
        <div className="w-12 h-px bg-text-white/10" />
        <MinuteBadge minute={minute} isGoal={false} />
        <div className="w-12 h-px bg-text-white/10" />
      </div>

      <div className="flex-1 flex items-center justify-start gap-3">
        <EventIcon type={awayEvent.type} />
        <PlayerInfo
          name={awayEvent.playerName}
          detail={awayEvent.assistOrDetail}
          align="left"
        />
      </div>
    </div>
  );
}
