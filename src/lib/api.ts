import { API_ENDPOINTS } from './constants';
import type { EventsApiResponse, SportEvent } from './types';

// Generic fetch wrapper with error handling
async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

// Fetch events by date (soccer only)
export async function fetchEventsByDate(date: string): Promise<SportEvent[]> {
    const data = await fetchJson<EventsApiResponse>(API_ENDPOINTS.EVENTS_BY_DATE(date));
    return data.events ?? [];
}

// Fetch event details by event ID
export async function fetchEventDetails(eventId: string): Promise<SportEvent | null> {
    const data = await fetchJson<EventsApiResponse>(API_ENDPOINTS.LOOKUP_EVENT(eventId));
    return data.events?.[0] ?? null;
}

