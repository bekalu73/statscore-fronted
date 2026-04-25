module.exports = {
  API_BASE_URL: 'http://localhost',
  ROUTES: {
    FIXTURE: '/',
    MATCH_DETAILS: '/match/:id',
    MATCH_DETAILS_PATH: (id) => `/match/${id}`,
  },
  LEAGUE_IDS: {
    PREMIER_LEAGUE: '4328',
    CHAMPIONS_LEAGUE: '4480',
    LA_LIGA: '4335',
    SERIE_A: '4332',
    BUNDESLIGA: '4331',
    LIGUE_1: '4334',
    FA_CUP: '4339',
  },
};
