import { useState, useMemo } from "react";
import { useFixtures } from "../hooks/useFixtures";
import type { FilterTab } from "../lib/types";
import { getMatchStatus } from "../lib/utils";
import DatePicker from "../components/fixtures/DatePicker";
import FilterTabs from "../components/fixtures/FilterTabs";
import LeagueSection from "../components/fixtures/LeagueSection";
import { MatchCardSkeleton } from "../components/ui/Skeleton";
import ErrorState from "../components/ui/ErrorState";
import EmptyState from "../components/ui/EmptyState";

export default function Fixtures() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const { leagues, allEvents, loading, error, refetch } = useFixtures(
    selectedDate,
    activeTab,
  );

  const liveCount = useMemo(
    () => allEvents.filter((e) => getMatchStatus(e) === "live").length,
    [allEvents],
  );

  const favoritesCount = useMemo(
    () => (allEvents.length > 0 ? Math.min(allEvents.length, 2) : 0),
    [allEvents],
  );

  return (
    <div className="max-w-4xl mx-auto px-3 md:px-6 py-4 space-y-4">
      <h1 className="text-xl font-bold text-text-primary">Matches</h1>

      <DatePicker selectedDate={selectedDate} onDateSelect={setSelectedDate} />

      <FilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        totalCount={allEvents.length}
        liveCount={liveCount}
        favoritesCount={favoritesCount}
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState message="Failed to load fixtures" onRetry={refetch} />
      ) : leagues.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {leagues?.map((league) => (
            <LeagueSection key={league.leagueId} league={league} />
          ))}
        </div>
      )}
    </div>
  );
}
