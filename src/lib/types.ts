// ===== API Response Types =====
export interface SportEvent {
    idEvent: string;
    idAPIfootball: string | null;
    strEvent: string;
    strEventAlternate: string;
    strFilename: string;
    strSport: string;
    idLeague: string;
    strLeague: string;
    strLeagueBadge: string;
    strSeason: string;
    strDescriptionEN: string | null;
    strHomeTeam: string;
    strAwayTeam: string;
    intHomeScore: string | null;
    intRound: string;
    intAwayScore: string | null;
    intSpectators: string | null;
    strOfficial: string;
    strTimestamp: string;
    dateEvent: string;
    dateEventLocal: string | null;
    strTime: string;
    strTimeLocal: string | null;
    strGroup: string | null;
    idHomeTeam: string;
    strHomeTeamBadge: string;
    idAwayTeam: string;
    strAwayTeamBadge: string;
    intScore: string | null;
    intScoreVotes: string | null;
    strResult: string | null;
    idVenue: string;
    strVenue: string;
    strCountry: string;
    strCity: string | null;
    strPoster: string;
    strSquare: string;
    strFanart: string | null;
    strThumb: string;
    strBanner: string;
    strMap: string | null;
    strTweet1: string | null;
    strVideo: string | null;
    strStatus: string;
    strPostponed: string;
    strLocked: string;
    intHomeScoreAgg?: string | null;
    intAwayScoreAgg?: string | null;
    strAggMessage?: string | null;
    strPenMessage?: string | null;
    intHomeRedCards?: number;
    intAwayRedCards?: number;
}

export interface EventsApiResponse {
    events: SportEvent[] | null;
}

// ===== Derived / UI Types =====
export interface LeagueGroup {
    leagueId: string;
    leagueName: string;
    leagueBadge: string;
    events: SportEvent[];
}

export type MatchStatus = 'live' | 'halftime' | 'finished' | 'upcoming' | 'postponed';

export interface TimelineEvent {
    id: string;
    minute: string;
    type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'corner' | 'injury' | 'var';
    side: 'home' | 'away';
    playerName: string;
    assistOrDetail?: string;
    isKeyEvent?: boolean;
}

export interface TimelinePeriodSeparator {
    id: string;
    label: string;
    score?: string;
}

export type TimelineItem =
    | { type: 'event'; data: TimelineEvent }
    | { type: 'separator'; data: TimelinePeriodSeparator };

export type FilterTab = 'all' | 'live' | 'favorites';
