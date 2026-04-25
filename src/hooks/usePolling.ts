import { useEffect, useRef, useCallback } from 'react';

export function usePolling(callback: () => void, intervalMs: number, enabled: boolean = true) {
    const savedCallback = useRef(callback);

    // Update the ref if callback changes
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!enabled) return;

        const tick = () => {
            savedCallback.current();
        };

        const id = setInterval(tick, intervalMs);

        return () => {
            clearInterval(id);
        };
    }, [intervalMs, enabled]);
}

/**
 * Custom hook to manage async data fetching with loading/error states
 */
export function useAsync<T>() {
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const execute = useCallback(async (asyncFn: () => Promise<T>) => {
        try {
            const result = await asyncFn();
            if (mountedRef.current) {
                return { data: result, error: null };
            }
            return { data: null, error: null };
        } catch (err) {
            if (mountedRef.current) {
                return { data: null, error: err as Error };
            }
            return { data: null, error: null };
        }
    }, []);

    return { execute, isMounted: () => mountedRef.current };
}
