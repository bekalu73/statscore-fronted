import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SportEvent } from "../../types";
import { formatEventDate, getMatchStatus } from "../../utils";
import Badge from "../ui/Badge";
import TeamBadge from "../ui/TeamBadge";

interface MatchHeaderProps {
  event: SportEvent;
  children: React.ReactNode;
}

export default function MatchHeader({ event, children }: MatchHeaderProps) {
  const navigate = useNavigate();
  const status = getMatchStatus(event);
  const hasScore = event.intHomeScore !== null && event.intAwayScore !== null;
  const dateFormatted = formatEventDate(event.dateEvent);

  return (
    <div className="bg-bg-surface rounded-t-xl overflow-hidden border-b-card">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border-primary">
        <button
          onClick={() => navigate(-1)}
          className="text-text-secondary hover:text-text-primary transition-colors"
          id="back-button"
        >
          <ArrowLeftIcon className="text-text-white size-5" />
        </button>
        <span className="text-sm text-text-white font-medium">
          {event.strLeague}
        </span>
      </div>

      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="relative">
            <TeamBadge
              src={event.strHomeTeamBadge}
              alt={event.strHomeTeam}
              size="lg"
            />
            {hasScore &&
              parseInt(event.intHomeScore!) > parseInt(event.intAwayScore!) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-accent rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">
                    {event.intHomeScore}
                  </span>
                </div>
              )}
          </div>
          <span className="text-xs md:text-sm font-semibold text-text-primary text-center leading-tight">
            {event.strHomeTeam}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] text-text-secondary font-medium">
            {dateFormatted}
          </span>
          {hasScore ? (
            <div className="flex items-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-text-primary tabular-nums">
                {event.intHomeScore}
              </span>
              <span className="text-xl text-text-muted font-light">-</span>
              <span className="text-3xl md:text-4xl font-bold text-text-primary tabular-nums">
                {event.intAwayScore}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-text-secondary">vs</span>
          )}
          {status === "finished" && (
            <Badge variant="red" size="md">
              Finished
            </Badge>
          )}
          {status === "live" && (
            <Badge variant="live" size="md">
              <span className="w-1.5 h-1.5 rounded-full bg-green-accent" />
              Live
            </Badge>
          )}
          {status === "halftime" && (
            <Badge variant="orange" size="md">
              Halftime
            </Badge>
          )}
          {status === "upcoming" && (
            <Badge variant="gray" size="md">
              {event.strTime?.substring(0, 5) || "TBD"}
            </Badge>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <div className="relative">
            <TeamBadge
              src={event.strAwayTeamBadge}
              alt={event.strAwayTeam}
              size="lg"
            />
            {hasScore &&
              parseInt(event.intAwayScore!) > parseInt(event.intHomeScore!) && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-accent rounded flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">
                    {event.intAwayScore}
                  </span>
                </div>
              )}
          </div>
          <span className="text-xs md:text-sm font-semibold text-text-primary text-center leading-tight">
            {event.strAwayTeam}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
