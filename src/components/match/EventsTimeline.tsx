import {
  ArrowDownIcon,
  ArrowUpIcon,
  FlagTriangleRight,
  Stethoscope,
  TvMinimalPlay,
} from "lucide-react";
import type { TimelineEvent, TimelineItem } from "../../types";
import SoccerBallIcon from "../icons/soccer-ball";

type DualEvent = {
  type: "dual_event";
  data: [TimelineEvent, TimelineEvent];
  minute: string;
};
type GroupedItem = TimelineItem | DualEvent;

function groupTimelineItems(items: TimelineItem[]): GroupedItem[] {
  const result: GroupedItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const curr = items[i];
    const next = items[i + 1];
    if (
      curr.type === "event" &&
      next?.type === "event" &&
      next.data.minute === curr.data.minute &&
      next.data.side !== curr.data.side
    ) {
      const [home, away] =
        curr.data.side === "home"
          ? [curr.data, next.data]
          : [next.data, curr.data];
      result.push({
        type: "dual_event",
        data: [home, away],
        minute: curr.data.minute,
      });
      i++;
    } else {
      result.push(curr);
    }
  }
  return result;
}

interface EventsTimelineProps {
  items: TimelineItem[];
}

export default function EventsTimeline({ items }: EventsTimelineProps) {
  const grouped = groupTimelineItems(items);

  return (
    <div className="bg-bg-surface rounded-lg overflow-hidden p-2">
      <div className="px-4 py-3 border-b border-border-primary">
        <h3 className="text-sm font-semibold text-text-primary">Events</h3>
      </div>

      <div className="relative px-4 py-4">
        <div className="absolute left-1/2 top-4 bottom-4 w-px bg-border-primary -translate-x-1/2" />

        <div className="flex flex-col gap-2">
          {grouped.map((item, idx) => {
            if (item.type === "separator") {
              return (
                <PeriodSeparator
                  key={item.data.id}
                  label={item.data.label}
                  score={item.data.score}
                />
              );
            }
            if (item.type === "dual_event") {
              return (
                <DualEventRow
                  key={`dual-${idx}`}
                  minute={item.minute}
                  homeEvent={item.data[0]}
                  awayEvent={item.data[1]}
                />
              );
            }
            return <TimelineEventRow key={item.data.id} event={item.data} />;
          })}
        </div>
      </div>
    </div>
  );
}

function PeriodSeparator({ label, score }: { label: string; score?: string }) {
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

function MinuteBadge({ minute, isGoal }: { minute: string; isGoal: boolean }) {
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

function PlayerInfo({
  name,
  detail,
  align,
}: {
  name: string;
  detail?: string;
  align: "left" | "right";
}) {
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

function TimelineEventRow({ event }: { event: TimelineEvent }) {
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

function DualEventRow({
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

function EventIcon({ type }: { type: TimelineEvent["type"] }) {
  switch (type) {
    case "goal":
      return (
        <div className="flex items-center justify-center rounded-full px-1">
          <SoccerBallIcon fill="#00FFA5" className="size-4" />
        </div>
      );
    case "yellow_card":
      return <div className="w-[14px] h-[14px] bg-[#E7D93F]" />;
    case "red_card":
      return <div className="w-[14px] h-[14px] bg-[#EE5E52]" />;
    case "substitution":
      return (
        <div className="flex items-center -space-x-1">
          <ArrowUpIcon className="w-3 h-6 text-[#00FF85] mb-1" />
          <ArrowDownIcon className="w-3 h-6 text-red-accent mt-1" />
        </div>
      );
    case "corner":
      return <FlagTriangleRight className="w-3 h-3 text-text-white" />;
    case "injury":
      return <Stethoscope className="w-4 h-4 text-text-white/80" />;
    case "var":
      return <TvMinimalPlay className="w-4 h-4 text-text-white" />;
    default:
      return null;
  }
}
