import type { MatchStatus, SportEvent, TimelineEvent, TimelineItem } from './types';

/**
 * Determine the match status from the API strStatus field
 */
export function getMatchStatus(event: SportEvent): MatchStatus {
    const status = event.strStatus?.toLowerCase() ?? '';

    if (status.includes('finished') || status === 'ft' || status === 'aet') return 'finished';
    if (status.includes('halftime') || status === 'ht') return 'halftime';
    if (status.includes('postponed')) return 'postponed';

    if (status && /\d/.test(status) && !status.includes('not started')) return 'live';

    if (event.intHomeScore !== null && event.intAwayScore !== null &&
        event.intHomeScore !== '' && event.intAwayScore !== '') {
        return 'finished';
    }

    if (status.includes('not started') || status === 'ns' || status === '') return 'upcoming';

    return 'upcoming';
}

/**
 * Get the display text for a match status
 */
export function getStatusDisplay(event: SportEvent): string {
    const status = getMatchStatus(event);

    switch (status) {
        case 'finished':
            return 'FT';
        case 'halftime':
            return 'HT';
        case 'live': {
            const s = event.strStatus?.toLowerCase() || '';
            const timestamp = event.strTimestamp;


            if (s.includes("'")) return s.toUpperCase();
            if ((s === '1h' || s === '2h') && timestamp) {
                try {
                    const startTime = new Date(timestamp).getTime();
                    const now = new Date().getTime();
                    const diffMs = now - startTime;
                    const diffMins = Math.floor(diffMs / 60000);

                    if (s === '1h') {
                        if (diffMins <= 0) return "1'";
                        if (diffMins > 45) return "45+'";
                        return `${diffMins}'`;
                    } else {
                        const secondHalfMins = diffMins - 60;
                        const matchMin = 45 + Math.max(0, secondHalfMins);

                        if (matchMin > 90) return "90+'";
                        if (matchMin <= 45) return "46'";
                        return `${matchMin}'`;
                    }
                } catch (e) {
                    console.error('Error calculating match minute:', e);
                }
            }

            const match = s.match(/\d+/);
            return match ? `${match[0]}'` : s.toUpperCase() || "LIVE";
        }
        case 'postponed':
            return 'PP';
        case 'upcoming': {
            const time = event.strTime;
            if (time) {
                return time.substring(0, 5);
            }
            return 'TBD';
        }
        default:
            return event.strStatus || 'TBD';
    }
}


export function getStatusColor(status: MatchStatus): string {
    switch (status) {
        case 'live':
            return 'border-l-secondary bg-gradient-to-r from-secondary/10 to-secondary-100/0';
        case 'halftime':
            return 'border-l-secondary';
        case 'finished':
            return 'border-l-red-accent';
        case 'upcoming':
            return 'border-l-gray-500/20';
        case 'postponed':
            return 'border-l-red-accent';
        default:
            return 'border-l-transparent';
    }
}

/**
 * Get the text color for a match status
 */
export function getStatusTextColor(status: MatchStatus): string {
    switch (status) {
        case 'live':
            return 'text-green-accent';
        case 'halftime':
            return 'text-green-accent';
        case 'finished':
            return 'text-red-accent';
        case 'upcoming':
            return 'text-text-white';
        case 'postponed':
            return 'text-red-accent';
        default:
            return 'text-text-white';
    }
}

/**
 * Format a date string into a readable format
 */
export function formatEventDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-GB', options).toUpperCase();
}

type MockEvent = Omit<TimelineEvent, 'id'>;

/** Builds a representative mock timeline scaled to the actual scoreline. */
export function generateMockTimeline(event: SportEvent): TimelineItem[] {
    const status = getMatchStatus(event);
    const homeScore = parseInt(event.intHomeScore || '0', 10);
    const awayScore = parseInt(event.intAwayScore || '0', 10);
    const timeDisplay = event.strTime?.substring(0, 5) || '13:00';

    const sep = (id: string, label: string, score?: string): TimelineItem => ({
        type: 'separator', data: { id, label, score },
    });
    const evt = (id: string, e: MockEvent): TimelineItem => ({
        type: 'event', data: { id, ...e },
    });

    if (status === 'upcoming') {
        return [sep('kickoff', `Kick Off - ${timeDisplay}`)];
    }

    const items: TimelineItem[] = [];

    if (status === 'finished') {
        items.push(sep('fulltime', 'Full Time', `${homeScore} - ${awayScore}`));
    }

    items.push(evt('sub-home-89',  { minute: "89'", type: 'substitution', side: 'home', playerName: 'Gyokeres', assistOrDetail: 'Ødegaard' }));
    if (awayScore > 1)  items.push(evt('goal-away-88', { minute: "88'", type: 'goal',         side: 'away', playerName: 'Ekitike',   assistOrDetail: 'Salah',     isKeyEvent: true }));
    items.push(evt('yellow-home-78', { minute: "78'", type: 'yellow_card', side: 'home', playerName: 'Saliba' }));
    items.push(evt('corner-home-74', { minute: "74'", type: 'corner',      side: 'home', playerName: '3rd corner' }));
    items.push(evt('sub-home-67',    { minute: "67'", type: 'substitution', side: 'home', playerName: 'Rice',      assistOrDetail: 'Zubimendi' }));
    items.push(evt('sub-away-67',    { minute: "67'", type: 'substitution', side: 'away', playerName: 'Frimpong', assistOrDetail: 'Robertson' }));
    items.push(evt('red-away-66',    { minute: "66'", type: 'red_card',     side: 'away', playerName: 'Van Dijk',  assistOrDetail: 'Sent Off' }));
    if (homeScore > 1) items.push(evt('goal-home-55', { minute: "55'", type: 'goal',         side: 'home', playerName: 'Saka',                          isKeyEvent: true }));
    items.push(evt('corner-home-52', { minute: "52'", type: 'corner',      side: 'home', playerName: '5th corner' }));
    items.push(evt('corner-away-48', { minute: "48'", type: 'corner',      side: 'away', playerName: '3rd corner' }));

    items.push(sep('halftime', 'Half Time', '1 - 0'));

    items.push(evt('corner-home-45', { minute: "45+2'", type: 'corner',      side: 'home', playerName: '2nd corner' }));
    items.push(evt('sub-away-45',    { minute: "45'",   type: 'substitution', side: 'away', playerName: 'Jones',    assistOrDetail: 'McAllister' }));
    items.push(evt('yellow-home-44', { minute: "44'",   type: 'yellow_card', side: 'home', playerName: 'Gabriel' }));
    items.push(evt('injury-away-44', { minute: "44'",   type: 'injury',      side: 'away', playerName: 'Jones',    assistOrDetail: 'Injured' }));
    items.push(evt('corner-home-36', { minute: "36'",   type: 'corner',      side: 'home', playerName: '1st corner' }));
    items.push(evt('yellow-away-34', { minute: "34'",   type: 'yellow_card', side: 'away', playerName: 'Konaté' }));
    items.push(evt('var-home-25',    { minute: "25'",   type: 'var',         side: 'home', playerName: 'Gyokeres' }));
    items.push(evt('corner-away-16', { minute: "16'",   type: 'corner',      side: 'away', playerName: '2nd corner' }));
    if (homeScore > 0) items.push(evt('goal-home-12', { minute: "12'", type: 'goal', side: 'home', playerName: 'Gyokeres', assistOrDetail: 'Ødegaard', isKeyEvent: true }));
    items.push(evt('corner-away-3',  { minute: "3'",    type: 'corner',      side: 'away', playerName: '1st corner' }));

    items.push(sep('kickoff', `Kick Off - ${timeDisplay}`));

    return items;
}

/**
 * Generate dates for the date picker bar
 */
export function generateDateRange(centerDate: Date, range: number = 3): Date[] {
    const dates: Date[] = [];
    for (let i = -range; i <= range; i++) {
        const d = new Date(centerDate);
        d.setDate(d.getDate() + i);
        dates.push(d);
    }
    return dates;
}

/**
 * Format date for picker display
 */
export function formatDatePicker(date: Date): { dayName: string; dayNum: string; month: string } {
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    return {
        dayName: dayNames[date.getDay()],
        dayNum: date.getDate().toString(),
        month: monthNames[date.getMonth()],
    };
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
    return isSameDay(date, new Date());
}
