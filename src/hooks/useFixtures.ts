import { useFetchData } from "../lib/useFetchData";
import { queryKeys, URL } from "../lib/queryKeys";
import type {
  SportEvent,
  LeagueGroup,
  FilterTab,
  EventsApiResponse,
} from "../types";
import { formatDateParam, getMatchStatus } from "../utils";
import { LEAGUE_IDS } from "../lib/constants";

const POLLING_INTERVAL_MS = 20_000;

const LEAGUE_PRIORITY: Record<string, number> = {
  [LEAGUE_IDS.CHAMPIONS_LEAGUE]: 1,
  [LEAGUE_IDS.PREMIER_LEAGUE]: 2,
  [LEAGUE_IDS.FA_CUP]: 3,
  [LEAGUE_IDS.BUNDESLIGA]: 4,
};

function groupByLeague(events: SportEvent[]): LeagueGroup[] {
  const map = new Map<string, LeagueGroup>();
  for (const event of events) {
    if (!map.has(event.idLeague)) {
      map.set(event.idLeague, {
        leagueId: event.idLeague,
        leagueName: event.strLeague,
        leagueBadge: event.strLeagueBadge,
        events: [],
      });
    }
    map.get(event.idLeague)!.events.push(event);
  }
  return Array.from(map.values()).sort(
    (a, b) =>
      (LEAGUE_PRIORITY[a.leagueId] ?? 999) -
      (LEAGUE_PRIORITY[b.leagueId] ?? 999),
  );
}

function filterByTab(events: SportEvent[], tab: FilterTab): SportEvent[] {
  if (tab === "all") return events;
  if (tab === "live")
    return events.filter((e) =>
      ["live", "halftime"].includes(getMatchStatus(e)),
    );
  const leagueCount = new Map<string, number>();
  return events.filter((e) => {
    const count = leagueCount.get(e.idLeague) ?? 0;
    if (count >= 2) return false;
    leagueCount.set(e.idLeague, count + 1);
    return true;
  });
}

export function useFixtures(selectedDate: Date, activeTab: FilterTab) {
  const dateStr = formatDateParam(selectedDate);

  const { data, isLoading, error, refetch } = useFetchData<EventsApiResponse>(
    [queryKeys.fixtures, dateStr],
    URL.fixtures(dateStr),
    { refetchInterval: POLLING_INTERVAL_MS },
  );

  const allEvents = [...(data?.events ?? [])].sort(
    (a, b) =>
      new Date(b.strTimestamp).getTime() - new Date(a.strTimestamp).getTime(),
  );

  return {
    leagues: groupByLeague(filterByTab(allEvents, activeTab)),
    allEvents,
    loading: isLoading,
    error,
    refetch,
  };
}
