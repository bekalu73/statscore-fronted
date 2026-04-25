// ===== API Configuration =====
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;


// ===== Route Paths =====
export const ROUTES = {
  FIXTURE: "/",
  MATCH_DETAILS: "/match/:id",
  MATCH_DETAILS_PATH: (id: string) => `/match/${id}`,
} as const;

// ===== League IDs =====
export const LEAGUE_IDS = {
  PREMIER_LEAGUE: "4328",
  CHAMPIONS_LEAGUE: "4480",
  LA_LIGA: "4335",
  SERIE_A: "4332",
  BUNDESLIGA: "4331",
  LIGUE_1: "4334",
  FA_CUP: "4339",
} as const;

// ===== Navigation =====
export const NAV_LINKS = [
  { label: "Live", href: "#", isActive: false },
  { label: "Matches", href: "/", isActive: true },
  { label: "Standings", href: "#", isActive: false },
  { label: "Teams", href: "#", isActive: false },
  { label: "Comparison", href: "#", isActive: false },
  { label: "Statistics", href: "#", isActive: false },
  { label: "Venues", href: "#", isActive: false },
] as const;
