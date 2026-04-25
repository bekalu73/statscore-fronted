import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import type { SportEvent } from '../../lib/types';
import { getMatchStatus, getStatusDisplay, getStatusColor, getStatusTextColor } from '../../lib/utils';
import { ROUTES } from '../../lib/constants';
import TeamBadge from '../ui/TeamBadge';

interface MatchCardProps {
    event: SportEvent;
}

export default function MatchCard({ event }: MatchCardProps) {
    const navigate = useNavigate();
    const status = getMatchStatus(event);
    const statusText = getStatusDisplay(event);
    const statusColorClass = getStatusColor(status);
    const statusTextColorClass = getStatusTextColor(status);

    const hasScore = event.intHomeScore !== null && event.intAwayScore !== null;

    return (
        <div
            onClick={() => navigate(ROUTES.MATCH_DETAILS_PATH(event.idEvent))}
            className="group relative flex items-stretch cursor-pointer transition-colors hover:bg-bg-canvas  mx-3"
            id={`match-card-${event.idEvent}`}
        >

            <div className={`w-[3px] rounded-base my-2.5  flex-shrink-0`} />


            <div className={`flex flex-col items-center justify-center w-[56px] md:w-[65px] flex-shrink-0  border-l-4 ${statusColorClass} `}>
                <span className={`text-sm font-medium mr-2 ${statusTextColorClass}`}>
                    {statusText}
                </span>
                {status === 'live' && (
                    <div className="w-4 h-0.5 bg-secondary/10 rounded mt-1 overflow-hidden loader" />
                )}
                {status === 'halftime' && (
                    <div className="w-4 h-0.5 bg-secondary/10 rounded mt-1 overflow-hidden loader" />
                )}
            </div>


            <div className="flex-1 py-2.5 pr-2 min-w-0 space-y-3">
                <div className="flex items-center gap-2.5">
                    <TeamBadge src={event.strHomeTeamBadge} alt={event.strHomeTeam} size="sm" />
                    <span className="text-sm text-text-primary font-medium truncate">
                        {event.strHomeTeam}
                    </span>


                    {event.intHomeRedCards && event.intHomeRedCards > 0 && (
                        <div className="w-2 h-3 bg-red-accent rounded-sm flex-shrink-0 animate-pulse" title={`${event.intHomeRedCards} Red Card(s)`} />
                    )}


                    {event.strAggMessage && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-secondary/5 rounded-2xl text-[10px] font-semibold text-secondary flex-shrink-0">
                            <span className="text-[8px]">✓</span> {event.strAggMessage}
                        </div>
                    )}

                    <div className="flex-1" />

                    {event.intHomeScoreAgg && (
                        <span className="text-xs text-text-muted mr-1 tabular-nums">
                            [{event.intHomeScoreAgg}]
                        </span>
                    )}

                    {hasScore && (
                        <span className="text-sm font-bold text-text-primary tabular-nums w-5 text-right">
                            {event.intHomeScore}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2.5">
                    <TeamBadge src={event.strAwayTeamBadge} alt={event.strAwayTeam} size="sm" />
                    <span className="text-sm text-text-primary font-medium truncate">
                        {event.strAwayTeam}
                    </span>

                    {event.intAwayRedCards && event.intAwayRedCards > 0 && (
                        <div className="w-2 h-3 bg-red-accent rounded-sm flex-shrink-0 animate-pulse" title={`${event.intAwayRedCards} Red Card(s)`} />
                    )}

                    {event.strPenMessage && (
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-secondary/5 rounded-2xl text-[10px] font-semibold text-secondary flex-shrink-0">
                            <span className="text-[8px]">✓</span> {event.strPenMessage}
                        </div>
                    )}

                    <div className="flex-1" />

                    {event.intAwayScoreAgg && (
                        <span className="text-xs text-text-muted mr-1 tabular-nums">
                            [{event.intAwayScoreAgg}]
                        </span>
                    )}

                    {hasScore && (
                        <span className="text-sm font-bold text-text-primary tabular-nums w-5 text-right">
                            {event.intAwayScore}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center px-2 flex-shrink-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="p-1 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
                >
                    <MoreVertical className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
}
