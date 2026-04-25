import { useFetchData } from "../lib/useFetchData";
import { queryKeys, URL } from "../lib/queryKeys";
import type { EventsApiResponse } from "../types";

export function useMatchDetails(eventId: string) {
  const { data, isLoading, error, refetch } = useFetchData<EventsApiResponse>(
    [queryKeys.match, eventId],
    URL.match(eventId),
    { enabled: !!eventId },
  );

  return {
    event: data?.events?.[0] ?? null,
    loading: isLoading,
    error,
    refetch,
  };
}
