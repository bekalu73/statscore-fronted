import {
    ArrowDownIcon,
    ArrowUpIcon,
    FlagTriangleRight,
    Stethoscope,
    TvMinimalPlay
} from 'lucide-react';
import type { TimelineEvent, TimelineItem } from '../../lib/types';
import SoccerBallIcon from '../icons/soccer-ball';

interface EventsTimelineProps {
    items: TimelineItem[];
}

export default function EventsTimeline({ items }: EventsTimelineProps) {

    const groupedItems: (TimelineItem | { type: 'dual_event'; data: TimelineEvent[]; minute: string })[] = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type === 'event') {
            const nextItem = items[i + 1];
            if (nextItem && nextItem.type === 'event' && nextItem.data.minute === item.data.minute && nextItem.data.side !== item.data.side) {
                groupedItems.push({
                    type: 'dual_event',
                    data: [item.data, nextItem.data].sort((a) => a.side === 'home' ? -1 : 1),
                    minute: item.data.minute
                });
                i++; // skip next
                continue;
            }
        }
        groupedItems.push(item);
    }

    return (
        <div className="bg-bg-surface rounded-lg overflow-hidden p-2">
            <div className="px-4 py-3 border-b border-border-primary">
                <h3 className="text-sm font-semibold text-text-primary">Events</h3>
            </div>

            <div className="relative px-4 py-4">

                <div className="absolute left-1/2 top-4 bottom-4 w-px bg-border-primary -translate-x-1/2" />

                <div className="flex flex-col gap-2">
                    {groupedItems.map((item, idx) => {
                        if (item.type === 'separator') {
                            return <PeriodSeparator key={item.data.id} label={item.data.label} score={item.data.score} />;
                        }
                        if (item.type === 'dual_event') {
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

// ===== Period Separator =====

function PeriodSeparator({ label, score }: { label: string; score?: string }) {
    return (
        <div className="relative flex items-center justify-center z-10">
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-text-white/10 z-0" />
            <div className="bg-bg-surface px-4 flex items-center gap-3 z-10">
                <span className="text-sm font-normal text-text-white/80">{label}</span>
                {score && <span className="text-sm font-medium text-text-white">{score}</span>}
            </div>
        </div>
    );
}

// ===== Timeline Event Row =====

function TimelineEventRow({ event }: { event: TimelineEvent }) {
    const isHome = event.side === 'home';
    const isGoal = event.type === 'goal';

    return (
        <div className="relative flex items-center w-full min-h-[32px] z-10">
            <div className={`flex-1 flex items-center gap-2.5 ${isHome ? 'justify-end pr-3' : 'justify-end pr-3 invisible'}`}>
                {isHome && (
                    <>
                        <div className="text-right">
                            <div className="text-sm font-medium text-text-white leading-tight">{event.playerName}</div>
                            {event.assistOrDetail && (
                                <div className="text-xs text-text-white/40 leading-tight">{event.assistOrDetail}</div>
                            )}
                        </div>
                        <EventIcon type={event.type} side="home" />
                    </>
                )}
            </div>

            {/* Central minute track */}
            <div className="flex items-center justify-center w-[100px] flex-shrink-0 relative gap-1">
                {isHome ? <div className="w-12 h-[1px] bg-text-white/10" /> : <div className="w-12 h-[1px] bg-text-white/0" />}
                <div
                    className={`
                        flex items-center justify-center min-w-[36px] h-[22px] rounded-full text-xs font-normal px-5 py-0.5 z-10
                        ${isGoal
                            ? 'bg-secondary text-bg-surface'
                            : 'bg-bg-muted text-text-white/90'
                        }
                    `}
                >
                    {event.minute}
                </div>

                {!isHome ? <div className="w-12 h-[1px] bg-text-white/10" /> : <div className="w-12 h-[1px] bg-text-white/0" />}
            </div>

            {/* Away side content */}
            <div className={`flex-1 flex items-center gap-1.5 ${!isHome ? 'justify-start pl-3' : 'justify-start pl-3 invisible'}`}>
                {!isHome && (
                    <>
                        <EventIcon type={event.type} side="away" />
                        <div className="text-left">
                            <div className="text-sm font-medium text-text-white leading-tight">{event.playerName}</div>
                            {event.assistOrDetail && (
                                <div className="text-xs text-text-white/40 leading-tight">{event.assistOrDetail}</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// ===== Dual Event Row (Simultaneous) =====

function DualEventRow({ minute, homeEvent, awayEvent }: { minute: string; homeEvent: TimelineEvent; awayEvent: TimelineEvent }) {
    return (
        <div className="relative flex items-center w-full min-h-[48px]  z-10 gap-3">
            {/* Home side */}
            <div className="flex-1 flex items-center justify-end gap-3">
                <div className="text-right">
                    <div className="text-sm font-medium text-text-white leading-tight">{homeEvent.playerName}</div>
                    {homeEvent.assistOrDetail && (
                        <div className="text-xs text-text-white/40 leading-tight">{homeEvent.assistOrDetail}</div>
                    )}
                </div>
                <EventIcon type={homeEvent.type} side="home" />
            </div>

            {/* Minute */}
            <div className="flex items-center justify-center w-[100px] flex-shrink-0 relative gap-1 ">
                <div className="w-12 h-[1px] bg-text-white/10" />
                <div className="flex items-center justify-center min-w-[36px] h-[22px] rounded-full text-xs font-normal px-5 z-10 bg-bg-muted text-text-white/90">
                    {minute}
                </div>
                <div className="w-12 h-[1px] bg-text-white/10" />
            </div>

            {/* Away side */}
            <div className="flex-1 flex items-center justify-start gap-3">
                <EventIcon type={awayEvent.type} side="away" />
                <div className="text-left">
                    <div className="text-sm font-medium text-text-white leading-tight">{awayEvent.playerName}</div>
                    {awayEvent.assistOrDetail && (
                        <div className="text-xs text-text-white/40 leading-tight">{awayEvent.assistOrDetail}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ===== Event Type Icon =====

function EventIcon({ type }: { type: TimelineEvent['type']; side: 'home' | 'away' }) {
    switch (type) {
        case 'goal':
            return (
                <div className="flex items-center justify-center rounded-full px-1">
                    <SoccerBallIcon fill='#00FFA5' className='size-4' />
                </div>
            );
        case 'yellow_card':
            return (
                <div className="w-[14px] h-[14px] bg-[#E7D93F]" />
            );
        case 'red_card':
            return (
                <div className="w-[14px] h-[14px] bg-[#EE5E52]" />
            );
        case 'substitution':
            return (
                <div className="flex items-center justify-center -space-x-1">
                    <ArrowUpIcon className="w-3 h-6 text-[#00FF85] mb-1" />
                    <ArrowDownIcon className="w-3 h-6 text-red-accent mt-1" />

                </div>
            );
        case 'corner':
            return (
                <div className="">
                    <FlagTriangleRight className="w-3 h-3 text-text-white" />
                </div>
            );
        case 'injury':
            return (
                <Stethoscope className="w-4 h-4 text-text-white/80" />
            );
        case 'var':
            return (
                <TvMinimalPlay className="w-4 h-4 text-text-white" />
            );
        default:
            return null;
    }
}
