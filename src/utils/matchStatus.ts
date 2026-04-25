import type { MatchStatus, SportEvent } from "../types";

export function getMatchStatus(event: SportEvent): MatchStatus {
  const status = event.strStatus?.toLowerCase() ?? "";

  if (status === "" || status === "ns" || status.includes("not started"))
    return "upcoming";
  if (status.includes("postponed")) return "postponed";
  if (status.includes("finished") || status === "ft" || status === "aet")
    return "finished";
  if (status.includes("halftime") || status === "ht") return "halftime";
  if (/\d/.test(status)) return "live";
  if (
    event.intHomeScore !== null &&
    event.intAwayScore !== null &&
    event.intHomeScore !== "" &&
    event.intAwayScore !== ""
  )
    return "finished";

  return "upcoming";
}

export function getStatusDisplay(event: SportEvent): string {
  const status = getMatchStatus(event);

  switch (status) {
    case "finished":
      return "FT";
    case "halftime":
      return "HT";
    case "postponed":
      return "PP";
    case "upcoming":
      return event.strTime ? event.strTime.substring(0, 5) : "TBD";
    case "live": {
      const s = event.strStatus?.toLowerCase() || "";
      if (s.includes("'")) return s.toUpperCase();
      if ((s === "1h" || s === "2h") && event.strTimestamp) {
        const diffMins = Math.floor(
          (Date.now() - new Date(event.strTimestamp).getTime()) / 60000,
        );
        if (s === "1h")
          return diffMins <= 0 ? "1'" : diffMins > 45 ? "45+'" : `${diffMins}'`;
        const matchMin = 45 + Math.max(0, diffMins - 60);
        return matchMin > 90 ? "90+'" : matchMin <= 45 ? "46'" : `${matchMin}'`;
      }
      const match = s.match(/\d+/);
      return match ? `${match[0]}'` : s.toUpperCase() || "LIVE";
    }
    default:
      return event.strStatus || "TBD";
  }
}

export function getStatusColor(status: MatchStatus): string {
  switch (status) {
    case "live":
      return "border-l-secondary bg-gradient-to-r from-secondary/10 to-secondary-100/0";
    case "halftime":
      return "border-l-secondary";
    case "finished":
      return "border-l-red-accent";
    case "upcoming":
      return "border-l-gray-500/20";
    case "postponed":
      return "border-l-red-accent";
    default:
      return "border-l-transparent";
  }
}

export function getStatusTextColor(status: MatchStatus): string {
  switch (status) {
    case "live":
    case "halftime":
      return "text-green-accent";
    case "finished":
    case "postponed":
      return "text-red-accent";
    default:
      return "text-text-white";
  }
}
