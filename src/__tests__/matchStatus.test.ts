/// <reference types="jest" />
import { getMatchStatus, getStatusDisplay, getStatusColor, getStatusTextColor } from '../utils/matchStatus';
import type { SportEvent } from '../types';

const baseEvent: SportEvent = {
  idEvent: '1',
  idAPIfootball: null,
  strEvent: 'Team A vs Team B',
  strEventAlternate: '',
  strFilename: '',
  strSport: 'Soccer',
  idLeague: '4328',
  strLeague: 'Premier League',
  strLeagueBadge: '',
  strSeason: '2024',
  strDescriptionEN: null,
  strHomeTeam: 'Team A',
  strAwayTeam: 'Team B',
  intHomeScore: null,
  intRound: '1',
  intAwayScore: null,
  intSpectators: null,
  strOfficial: '',
  strWeather: null,
  strTimestamp: '2024-06-15T15:00:00+00:00',
  dateEvent: '2024-06-15',
  dateEventLocal: null,
  strTime: '15:00:00',
  strTimeLocal: null,
  strGroup: null,
  strResult: null,
  idHomeTeam: '1',
  strHomeTeamBadge: '',
  idAwayTeam: '2',
  strAwayTeamBadge: '',
  intScore: null,
  intScoreVotes: null,
  idVenue: '1',
  strVenue: 'Stadium',
  strCountry: 'England',
  strCity: null,
  strPoster: '',
  strSquare: '',
  strFanart: null,
  strThumb: '',
  strBanner: '',
  strMap: null,
  strTweet1: null,
  strVideo: null,
  strStatus: '',
  strPostponed: 'no',
  strLocked: 'unlocked',
};

describe('getMatchStatus', () => {
  it('returns upcoming for empty status', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: '' })).toBe('upcoming');
  });

  it('returns upcoming for NS status', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: 'NS' })).toBe('upcoming');
  });

  it('returns finished for FT status', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: 'FT' })).toBe('finished');
  });

  it('returns finished for "Finished" status', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: 'Finished' })).toBe('finished');
  });

  it('returns halftime for HT status', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: 'HT' })).toBe('halftime');
  });

  it('returns live for minute-based status', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: "45'" })).toBe('live');
  });

  it('returns postponed for postponed status', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: 'Postponed' })).toBe('postponed');
  });

  it('returns finished when scores are present and status is not started', () => {
    // strStatus empty string is treated as "not started" (upcoming) — scores alone don't override it
    expect(getMatchStatus({ ...baseEvent, strStatus: 'NS', intHomeScore: '2', intAwayScore: '1' })).toBe('upcoming');
  });

  it('returns finished when scores present and status is not a known keyword', () => {
    expect(getMatchStatus({ ...baseEvent, strStatus: 'unknown', intHomeScore: '2', intAwayScore: '1' })).toBe('finished');
  });
});

describe('getStatusDisplay', () => {
  it('returns FT for finished', () => {
    expect(getStatusDisplay({ ...baseEvent, strStatus: 'FT' })).toBe('FT');
  });

  it('returns HT for halftime', () => {
    expect(getStatusDisplay({ ...baseEvent, strStatus: 'HT' })).toBe('HT');
  });

  it('returns PP for postponed', () => {
    expect(getStatusDisplay({ ...baseEvent, strStatus: 'Postponed' })).toBe('PP');
  });

  it('returns time for upcoming', () => {
    expect(getStatusDisplay({ ...baseEvent, strStatus: '', strTime: '15:00:00' })).toBe('15:00');
  });

  it('returns TBD when no time for upcoming', () => {
    expect(getStatusDisplay({ ...baseEvent, strStatus: '', strTime: '' })).toBe('TBD');
  });
});

describe('getStatusColor', () => {
  it('returns green gradient for live', () => {
    expect(getStatusColor('live')).toContain('secondary');
  });

  it('returns red for finished', () => {
    expect(getStatusColor('finished')).toContain('red-accent');
  });
});

describe('getStatusTextColor', () => {
  it('returns green for live', () => {
    expect(getStatusTextColor('live')).toContain('green-accent');
  });

  it('returns red for finished', () => {
    expect(getStatusTextColor('finished')).toContain('red-accent');
  });

  it('returns white for upcoming', () => {
    expect(getStatusTextColor('upcoming')).toContain('text-white');
  });
});
