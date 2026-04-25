import type { MatchStatus, SportEvent, TimelineItem } from './types';

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

/**
 * Generate mock timeline data for a match (the free API doesn't provide event-level details)
 */
export function generateMockTimeline(event: SportEvent): TimelineItem[] {
    const status = getMatchStatus(event);
    const homeScore = parseInt(event.intHomeScore || '0', 10);
    const awayScore = parseInt(event.intAwayScore || '0', 10);
    const timeDisplay = event.strTime?.substring(0, 5) || '13:00';

    // If match is upcoming, only show Kick Off
    if (status === 'upcoming') {
        return [{
            type: 'separator',
            data: { id: 'kickoff', label: `Kick Off - ${timeDisplay}`, score: undefined },
        }];
    }

    const items: TimelineItem[] = [];

    // Fulltime (Only if finished)
    if (status === 'finished') {
        items.push({
            type: 'separator',
            data: {
                id: 'fulltime',
                label: 'Fulltime',
                score: `${homeScore} - ${awayScore}`,
            },
        });
    }

    // 89' Sub Home
    items.push({
        type: 'event',
        data: {
            id: 'sub-3',
            minute: "89'",
            type: 'substitution',
            side: 'home',
            playerName: 'Gyokores',
            assistOrDetail: 'Odegard',
        },
    });

    // 88' Goal Away
    if (awayScore > 1) {
        items.push({
            type: 'event',
            data: {
                id: 'goal-away-2',
                minute: "88'",
                type: 'goal',
                side: 'away',
                playerName: 'Ekitike',
                assistOrDetail: 'Sallah',
                isKeyEvent: true,
            },
        });
    }

    // 78' Yellow Home
    items.push({
        type: 'event',
        data: {
            id: 'yellow-2',
            minute: "78'",
            type: 'yellow_card',
            side: 'home',
            playerName: 'Saliba',
        },
    });

    // 74' Corner Home
    items.push({
        type: 'event',
        data: {
            id: 'corner-4',
            minute: "74'",
            type: 'corner',
            side: 'home',
            playerName: '3rd corner',
        },
    });

    // 67' Sub Dual
    items.push({
        type: 'event',
        data: {
            id: 'sub-dual',
            minute: "67'",
            type: 'substitution',
            side: 'home',
            playerName: 'Rice',
            assistOrDetail: 'Zubemendi',
        },
    });
    items.push({
        type: 'event',
        data: {
            id: 'sub-dual-away',
            minute: "67'",
            type: 'substitution',
            side: 'away',
            playerName: 'Frimpong',
            assistOrDetail: 'Robertson',
        },
    });

    // 66' Red Away
    items.push({
        type: 'event',
        data: {
            id: 'red-1',
            minute: "66'",
            type: 'red_card',
            side: 'away',
            playerName: 'Van Dijk',
            assistOrDetail: 'Sent Off',
        },
    });

    // 55' Goal Home
    if (homeScore > 1) {
        items.push({
            type: 'event',
            data: {
                id: 'goal-home-2',
                minute: "55'",
                type: 'goal',
                side: 'home',
                playerName: 'Saka',
                isKeyEvent: true,
            },
        });
    }

    // 52' Corner Home
    items.push({
        type: 'event',
        data: {
            id: 'corner-3',
            minute: "52'",
            type: 'corner',
            side: 'home',
            playerName: '5th corner',
        },
    });

    // 48' Corner Away
    items.push({
        type: 'event',
        data: {
            id: 'corner-away-1',
            minute: "48'",
            type: 'corner',
            side: 'away',
            playerName: '3rd Corner',
        },
    });

    // Halftime
    items.push({
        type: 'separator',
        data: { id: 'halftime', label: "Halftime '", score: `1 - 0` },
    });

    // 45+2' Corner Home
    items.push({
        type: 'event',
        data: {
            id: 'corner-1-extra',
            minute: "45+2'",
            type: 'corner',
            side: 'home',
            playerName: '2nd corner',
        },
    });

    // 45' Sub Away
    items.push({
        type: 'event',
        data: {
            id: 'sub-away-1',
            minute: "45'",
            type: 'substitution',
            side: 'away',
            playerName: 'Jones',
            assistOrDetail: 'Mcalister',
        },
    });

    // 44' Yellow Home
    items.push({
        type: 'event',
        data: {
            id: 'yellow-1',
            minute: "44'",
            type: 'yellow_card',
            side: 'home',
            playerName: 'Gabriel',
        },
    });

    // 44' Injury Away
    items.push({
        type: 'event',
        data: {
            id: 'injury-1',
            minute: "44'",
            type: 'injury',
            side: 'away',
            playerName: 'Jones',
            assistOrDetail: 'Injured',
        },
    });

    // 36' Corner Home
    items.push({
        type: 'event',
        data: {
            id: 'corner-1',
            minute: "36'",
            type: 'corner',
            side: 'home',
            playerName: '1st corner',
        },
    });

    // 34' Yellow Away
    items.push({
        type: 'event',
        data: {
            id: 'yellow-away-1',
            minute: "34'",
            type: 'yellow_card',
            side: 'away',
            playerName: 'Konate',
        },
    });

    // 25' VAR (?) - Shown as a different icon in screenshot, looks like a blast or spark
    items.push({
        type: 'event',
        data: {
            id: 'var-1',
            minute: "25'",
            type: 'var',
            side: 'home',
            playerName: 'Gyokores',
        },
    });

    // 16' Corner Away
    items.push({
        type: 'event',
        data: {
            id: 'corner-away-0',
            minute: "16'",
            type: 'corner',
            side: 'away',
            playerName: '2nd Corner',
        },
    });

    // 12' Goal Home
    if (homeScore > 0) {
        items.push({
            type: 'event',
            data: {
                id: 'goal-home-1',
                minute: "12'",
                type: 'goal',
                side: 'home',
                playerName: 'Gyokores',
                assistOrDetail: 'Odegard',
                isKeyEvent: true,
            },
        });
    }

    // 3' Corner Away
    items.push({
        type: 'event',
        data: {
            id: 'corner-away-init',
            minute: "3'",
            type: 'corner',
            side: 'away',
            playerName: '1st Corner',
        },
    });

    // Kick Off
    items.push({
        type: 'separator',
        data: { id: 'kickoff', label: `Kick Off - ${timeDisplay}`, score: undefined },
    });

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
