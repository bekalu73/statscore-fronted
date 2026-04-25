import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import type { SportEvent } from "../../types";
import {
  getMatchStatus,
  getStatusDisplay,
  getStatusColor,
  getStatusTextColor,
} from "../../utils";
import { ROUTES } from "../../lib/constants";
import TeamBadge from "../ui/TeamBadge";

interface MatchCardProps {
  event: SportEvent;
}

function LiveIndicator() {
  return (
    <div className="w-4 h-0.5 bg-secondary/10 rounded mt-1 overflow-hidden loader" />
  );
}

function TeamRow({
  badge,
  name,
  redCards,
  tag,
  aggScore,
  score,
  hasScore,
}: {
  badge: string | null;
  name: string;
  redCards?: number;
  tag?: string;
  aggScore?: string;
  score?: string;
  hasScore: boolean;
}) {
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

export default function MatchCard({ event }: MatchCardProps) {
  const navigate = useNavigate();
  const status = getMatchStatus(event);
  const statusText = getStatusDisplay(event);
  const isLiveOrHT = status === "live" || status === "halftime";
  const hasScore = event.intHomeScore !== null && event.intAwayScore !== null;

  return (
    <div
      onClick={() => navigate(ROUTES.MATCH_DETAILS_PATH(event.idEvent))}
      className="group relative flex items-stretch cursor-pointer transition-colors hover:bg-bg-canvas mx-3"
    >
      <div
        className={`flex flex-col items-center justify-center w-[56px] md:w-[65px] shrink-0 border-l-4 ${getStatusColor(status)}`}
      >
        <span
          className={`text-sm font-medium mr-2 ${getStatusTextColor(status)}`}
        >
          {statusText}
        </span>
        {isLiveOrHT && <LiveIndicator />}
      </div>

      <div className="flex-1 py-2.5 pr-2 min-w-0 space-y-3">
        <TeamRow
          badge={event.strHomeTeamBadge}
          name={event.strHomeTeam}
          redCards={event.intHomeRedCards}
          tag={event.strAggMessage ?? undefined}
          aggScore={event.intHomeScoreAgg ?? undefined}
          score={event.intHomeScore ?? undefined}
          hasScore={hasScore}
        />
        <TeamRow
          badge={event.strAwayTeamBadge}
          name={event.strAwayTeam}
          redCards={event.intAwayRedCards}
          tag={event.strPenMessage ?? undefined}
          aggScore={event.intAwayScoreAgg ?? undefined}
          score={event.intAwayScore ?? undefined}
          hasScore={hasScore}
        />
      </div>

      <div className="flex items-center px-2 shrink-0">
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1 text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
        >
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
