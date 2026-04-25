import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchEventsByDate } from '../lib/api';
import type { SportEvent, LeagueGroup, FilterTab } from '../lib/types';
import { getMatchStatus } from '../lib/utils';
import { usePolling } from './usePolling';
import { POLLING_INTERVAL_MS, LEAGUE_IDS } from '../lib/constants';

const LEAGUE_PRIORITY: Record<string, number> = {
    [LEAGUE_IDS.CHAMPIONS_LEAGUE]: 1,
    [LEAGUE_IDS.PREMIER_LEAGUE]: 2,
    [LEAGUE_IDS.FA_CUP]: 3,
    [LEAGUE_IDS.BUNDESLIGA]: 4,
};

function groupByLeague(events: SportEvent[]): LeagueGroup[] {
    const map = new Map<string, LeagueGroup>();

    for (const event of events) {
        const key = event.idLeague;
        if (!map.has(key)) {
            map.set(key, {
                leagueId: event.idLeague,
                leagueName: event.strLeague,
                leagueBadge: event.strLeagueBadge,
                events: [],
            });
        }
        map.get(key)!.events.push(event);
    }

    return Array.from(map.values()).sort((a, b) => {
        const priorityA = LEAGUE_PRIORITY[a.leagueId] ?? 999;
        const priorityB = LEAGUE_PRIORITY[b.leagueId] ?? 999;
        return priorityA - priorityB;
    });
}

function formatDateParam(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function filterByTab(events: SportEvent[], tab: FilterTab): SportEvent[] {
    if (tab === 'all') return events;
    if (tab === 'live') {
        return events.filter((e) => {
            const s = getMatchStatus(e);
            return s === 'live' || s === 'halftime';
        });
    }
    // favorites — show first 2 per league as mock
    const leagueCount = new Map<string, number>();
    return events.filter((e) => {
        const count = leagueCount.get(e.idLeague) ?? 0;
        if (count >= 2) return false;
        leagueCount.set(e.idLeague, count + 1);
        return true;
    });
}

interface UseFixturesReturn {
    leagues: LeagueGroup[];
    allEvents: SportEvent[];
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useFixtures(selectedDate: Date, activeTab: FilterTab): UseFixturesReturn {
    const [allEvents, setAllEvents] = useState<SportEvent[]>([]);
    const [leagues, setLeagues] = useState<LeagueGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const dateStr = formatDateParam(selectedDate);
    const prevDateStr = useRef(dateStr);

    const fetchData = useCallback(async () => {
        try {
            if (prevDateStr.current !== dateStr) {
                setLoading(true);
                prevDateStr.current = dateStr;
            }

            let events = await fetchEventsByDate(dateStr);

            events.sort(
                (a, b) => new Date(b.strTimestamp).getTime() - new Date(a.strTimestamp).getTime()
            );

            setAllEvents(events);

            const filtered = filterByTab(events, activeTab);
            setLeagues(groupByLeague(filtered));
            setError(null);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [dateStr, activeTab]);

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [fetchData]);

    usePolling(fetchData, POLLING_INTERVAL_MS, !loading);

    return { leagues, allEvents, loading, error, refetch: fetchData };
}
