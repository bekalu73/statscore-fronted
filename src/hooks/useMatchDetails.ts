import { useState, useEffect } from 'react';
import { fetchEventDetails } from '../lib/api';
import type { SportEvent } from '../lib/types';

interface UseMatchDetailsReturn {
    event: SportEvent | null;
    loading: boolean;
    error: Error | null;
}

export function useMatchDetails(eventId: string): UseMatchDetailsReturn {
    const [event, setEvent] = useState<SportEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchEventDetails(eventId);
                if (!cancelled) {
                    setEvent(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err as Error);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => {
            cancelled = true;
        };
    }, [eventId]);

    return { event, loading, error };
}
