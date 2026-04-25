import { ChevronRight } from "lucide-react";
import type { LeagueGroup } from "../../types";
import MatchCard from "./MatchCard";

interface LeagueSectionProps {
  league: LeagueGroup;
}

export default function LeagueSection({ league }: LeagueSectionProps) {
  return (
    <div className="bg-bg-surface rounded-lg overflow-hidden animate-fade-in p-1.5">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-primary">
        <h2 className="text-sm font-semibold text-text-primary">
          {league.leagueName}
        </h2>
        <button className="text-text-muted hover:text-text-secondary transition-colors cursor-pointer">
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>

      <div className="divide-y divide-border-primary space-y-2">
        {league.events.map((event) => (
          <MatchCard key={event.idEvent} event={event} />
        ))}
      </div>
    </div>
  );
}
