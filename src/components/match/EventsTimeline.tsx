import type { TimelineItem } from "../../types";
import { groupTimelineItems } from "../../utils";
import DualEventRow from "./timeline/DualEventRow";
import PeriodSeparator from "./timeline/PeriodSeparator";
import TimelineEventRow from "./timeline/TimelineEventRow";
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
        {/* Vertical center line */}
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
