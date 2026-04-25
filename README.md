# ⚽ The Sports Hub

> **Expertly — Senior Frontend Developer Take-Home Assessment**
>
> A pixel-perfect, production-quality sports dashboard built from the provided [Figma design](https://www.figma.com/) using React 19, TypeScript, and Tailwind CSS 4. The app connects to [TheSportsDB](https://www.thesportsdb.com/) public API to display live fixtures, scores, and detailed match events.

**🔗 Live Demo:** [https://expertly-home-take-assessment.vercel.app/](url)

**📦 Repository:** [github.com/zedatgithub12/expertly-home-take-assessment](https://github.com/zedatgithub12/expertly-home-take-assessment.git)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (bundled with Node)

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/zedatgithub12/expertly-home-take-assessment.git
cd expertly-home-take-assessment

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start the development server (http://localhost:5173)
npm run dev
```

### Other Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check (`tsc`) then build for production |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across the project |

---

## ✅ Assessment Requirements — Implementation Summary

### 1. Fixtures & Live Scoreboard (Dashboard)

| Requirement | Implementation |
| --- | --- |
| Fetch live/upcoming matches | `useFixtures` hook fetches from `/eventsday.php` endpoint, filtered to Soccer |
| Sidebar navigation | Responsive `Sidebar` component with nav links matching the Figma layout; mobile drawer with overlay |
| Top header with tabs | `Header` component with Live, Matches, Standings tabs |
| Match cards (logos, scores, status) | `MatchCard` component displaying team badges, scores, live/FT/HT/upcoming status indicators, aggregate scores, penalty tags, and red-card badges |
| Live polling (15–20s) | `usePolling` custom hook polls every **20 seconds** with proper `clearInterval` cleanup on unmount |
| Date-based browsing | Custom `DatePicker` with compact ↔ expanded modes (±14 day range) |
| Filter tabs | `FilterTabs` component with **All** / **Live** / **Favorites** filters showing live counts |

### 2. Match Details View

| Requirement | Implementation |
| --- | --- |
| Navigate to `/match/:id` | `MatchCard` uses `react-router-dom`'s `useNavigate` to push to dynamic route |
| Fetch match data by event ID | `useMatchDetails` hook calls `/lookupevent.php?id={EVENT_ID}` with cancellation-safe state |
| Head-to-Head header | `MatchHeader` component with large team badges, score, date, league name, and status badge |
| Events timeline | `EventsTimeline` component rendering goals ⚽, yellow 🟨 / red 🟥 cards, substitutions, corners, injuries, and VAR decisions on a centred vertical timeline |
| Dual-event grouping | Events at the same minute on opposite sides are merged into a single `DualEventRow` |

### 3. Technical & Styling Requirements

| Requirement | Status |
| --- | --- |
| **React** (Vite) | ✅ React 19 + Vite 7 |
| **TypeScript** | ✅ Strict mode enabled (`tsconfig.app.json`) |
| **React Router** | ✅ React Router v7 — `/` and `/match/:id` |
| **Tailwind CSS** | ✅ Tailwind CSS 4 with `@tailwindcss/vite` plugin |
| **Dark Mode** | ✅ Default dark theme with hand-crafted design tokens |
| **Pixel-perfect Figma match** | ✅ Colours, spacing, typography, and border-radii taken from Figma CSS inspect |

---

## 🛠 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React 19 |
| **Language** | TypeScript 5.9 (strict mode) |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router v7 |
| **Icons** | Lucide React + custom SVG components |
| **API** | [TheSportsDB](https://www.thesportsdb.com/api/v1/json/123) (free tier) |
| **Font** | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── fixtures/               # Dashboard-level components
│   │   ├── DatePicker.tsx          # Date navigation (compact/expanded modes)
│   │   ├── FilterTabs.tsx          # All / Live / Favorites tabs with counts
│   │   ├── LeagueSection.tsx       # League header + match list
│   │   └── MatchCard.tsx           # Individual fixture card
│   ├── icons/                  # Custom SVG icon components
│   │   ├── english-flag.tsx
│   │   ├── leading.tsx
│   │   └── soccer-ball.tsx
│   ├── layout/                 # App shell
│   │   ├── Header.tsx              # Top bar with navigation tabs
│   │   ├── MainLayout.tsx          # Sidebar + header + <Outlet />
│   │   └── Sidebar.tsx             # Mobile drawer navigation
│   ├── match/                  # Match detail components
│   │   ├── EventsTimeline.tsx      # Vertical timeline (goals, cards, subs)
│   │   ├── MatchHeader.tsx         # Large score header + team badges
│   │   └── MatchTabs.tsx           # Detail page tab bar
│   └── ui/                     # Reusable UI primitives
│       ├── Badge.tsx               # Status / info badges
│       ├── EmptyState.tsx          # "No matches" placeholder
│       ├── ErrorState.tsx          # Error with retry button
│       ├── Skeleton.tsx            # Animated loading skeletons
│       └── TeamBadge.tsx           # Team crest image with fallback
├── hooks/
│   ├── useFixtures.ts          # Fetch, filter, group & poll fixtures
│   ├── useMatchDetails.ts      # Fetch single match by event ID
│   └── usePolling.ts           # Generic interval polling with cleanup
├── lib/
│   ├── api.ts                  # Fetch wrappers (no magic strings)
│   ├── constants.ts            # API URLs, routes, league IDs, nav links
│   ├── types.ts                # TypeScript interfaces & type aliases
│   └── utils.ts                # Status logic, date helpers, timeline builder
├── pages/
│   ├── Dashboard.tsx           # Fixtures dashboard (main page)
│   └── MatchDetails.tsx        # Individual match detail view
├── App.tsx                     # Router setup
├── main.tsx                    # Entry point
└── index.css                   # Tailwind theme tokens + custom animations
```

---

## 🏗 Architecture & Best Practices

### Component Architecture
- **Composition over inheritance** — Complex UI is built from small, focused components (`MatchCard`, `TeamBadge`, `Badge`, `EventsTimeline`).
- **Separation of concerns** — Business logic (data fetching, filtering, polling) lives in custom hooks; components are purely presentational.

### Data Fetching
- **Abstracted into hooks** — `useFixtures(date, tab)` and `useMatchDetails(id)` encapsulate all API logic.
- **Centralised API layer** — All endpoints are defined in `constants.ts`; fetch calls go through a typed `fetchJson<T>()` wrapper in `api.ts`.
- **Robust error handling** — Graceful `ErrorState` component with retry, `EmptyState` for no-match scenarios, and skeleton loading states.

### Async & Polling
- **`usePolling` hook** — Uses `useRef` for callback stabilisation to avoid stale closures; `clearInterval` cleanup on unmount.
- **Cancellation-safe fetches** — `useMatchDetails` uses a `cancelled` flag to prevent state updates on unmounted components.

### Code Quality
- **No magic strings** — API endpoints, route paths, league IDs, and nav links are all in `constants.ts`.
- **Strict TypeScript** — `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` all enabled.
- **Clean SVG management** — Icons are either Lucide React components or custom `.tsx` SVG components.

### Styling
- **Design tokens** — All colours, typography, and spacing defined via `@theme` in `index.css`, directly mapping Figma CSS inspect values.
- **Custom scrollbar** — Slim 6 px scrollbar styled to match the dark theme.
- **Animations** — `fade-in` page transitions, `pulse-live` indicators, and `slideinout` shimmer loaders.

---

## 🌐 API Reference

**Base URL:** `https://www.thesportsdb.com/api/v1/json/123`

| Endpoint | Purpose |
| --- | --- |
| `GET /eventsday.php?d=YYYY-MM-DD&s=Soccer` | Fetch all soccer fixtures for a given date |
| `GET /lookupevent.php?id={eventId}` | Fetch full details for a single match |

> The free API key (`123`) is rate-limited. No authentication is required.

---

## ⚙️ Configuration

### Environment Variables

The app uses a `.env` file for sensitive/environment-specific configuration. Vite exposes variables prefixed with `VITE_` to the client via `import.meta.env`.

```bash
# Copy the example file to create your local .env
cp .env.example .env
```

| Variable | Description | Required |
| --- | --- | --- |
| `VITE_API_BASE_URL` | TheSportsDB API base URL | ✅ Yes |

**`.env.example`** is committed to the repo as a reference. **`.env`** is git-ignored and never committed.

> **Deployment note:** When deploying to Vercel or Netlify, add `VITE_API_BASE_URL` as an environment variable in the platform's project settings.

### App Constants

Other configurable values live in [`src/lib/constants.ts`](src/lib/constants.ts):

| Constant | Purpose | Default |
| --- | --- | --- |
| `POLLING_INTERVAL_MS` | Live-score refresh interval | `20000` (20s) |
| `LEAGUE_IDS` | League identifiers for priority sorting | Premier League, UCL, etc. |
| `NAV_LINKS` | Sidebar navigation items | 7 links |

---
