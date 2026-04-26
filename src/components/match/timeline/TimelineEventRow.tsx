import type { TimelineEvent } from "../../../types";
import EventIcon from "./EventIcon";
import MinuteBadge from "./MinuteBadge";
import PlayerInfo from "./PlayerInfo";

export default function TimelineEventRow({ event }: { event: TimelineEvent }) {
  const isHome = event.side === "home";
  const isGoal = event.type === "goal";
  const connector = <div className="w-12 h-px bg-text-white/10" />;
  const spacer = <div className="w-12" />;

  return (
    <div className="relative flex items-center w-full min-h-[32px] z-10">
      <div
        className={`flex-1 flex items-center gap-2.5 justify-end pr-3 ${!isHome ? "invisible" : ""}`}
      >
        {isHome && (
          <>
            <PlayerInfo
              name={event.playerName}
              detail={event.assistOrDetail}
              align="right"
            />
            <EventIcon type={event.type} />
          </>
        )}
      </div>

      <div className="flex items-center justify-center w-[100px] shrink-0 gap-1">
        {isHome ? connector : spacer}
        <MinuteBadge minute={event.minute} isGoal={isGoal} />
        {!isHome ? connector : spacer}
      </div>

      <div
        className={`flex-1 flex items-center gap-1.5 justify-start pl-3 ${isHome ? "invisible" : ""}`}
      >
        {!isHome && (
          <>
            <EventIcon type={event.type} />
            <PlayerInfo
              name={event.playerName}
              detail={event.assistOrDetail}
              align="left"
            />
          </>
        )}
      </div>
    </div>
  );
}
