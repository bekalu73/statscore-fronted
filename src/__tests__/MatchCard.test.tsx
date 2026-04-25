/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MatchCard from '../components/fixtures/MatchCard';
import type { SportEvent } from '../types';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const baseEvent: SportEvent = {
  idEvent: '123',
  idAPIfootball: null,
  strEvent: 'Arsenal vs Liverpool',
  strEventAlternate: '',
  strFilename: '',
  strSport: 'Soccer',
  idLeague: '4328',
  strLeague: 'Premier League',
  strLeagueBadge: '',
  strSeason: '2024',
  strDescriptionEN: null,
  strHomeTeam: 'Arsenal',
  strAwayTeam: 'Liverpool',
  intHomeScore: '2',
  intRound: '1',
  intAwayScore: '1',
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
  strVenue: 'Emirates',
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
  strStatus: 'FT',
  strPostponed: 'no',
  strLocked: 'unlocked',
};

const renderCard = (event = baseEvent) =>
  render(
    <MemoryRouter>
      <MatchCard event={event} />
    </MemoryRouter>
  );

describe('MatchCard', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders home and away team names', () => {
    renderCard();
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Liverpool')).toBeInTheDocument();
  });

  it('renders scores when available', () => {
    renderCard();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders FT status for finished match', () => {
    renderCard();
    expect(screen.getByText('FT')).toBeInTheDocument();
  });

  it('navigates to match details on card click', () => {
    renderCard();
    fireEvent.click(screen.getByText('Arsenal').closest('div[class*="group"]')!);
    expect(mockNavigate).toHaveBeenCalledWith('/match/123');
  });

  it('does not navigate when more options button is clicked', () => {
    renderCard();
    const moreBtn = screen.getByRole('button');
    fireEvent.click(moreBtn);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('renders upcoming time for match without score', () => {
    renderCard({ ...baseEvent, strStatus: '', intHomeScore: null, intAwayScore: null });
    expect(screen.getByText('15:00')).toBeInTheDocument();
  });
});
