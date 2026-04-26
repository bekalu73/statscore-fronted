import type { SportEvent, TimelineEvent, TimelineItem } from "../types";
import { getMatchStatus } from "./matchStatus";

type MockEvent = Omit<TimelineEvent, "id">;

export function generateMockTimeline(event: SportEvent): TimelineItem[] {
  const status = getMatchStatus(event);
  const homeScore = parseInt(event.intHomeScore || "0", 10);
  const awayScore = parseInt(event.intAwayScore || "0", 10);
  const timeDisplay = event.strTime?.substring(0, 5) || "13:00";

  const sep = (id: string, label: string, score?: string): TimelineItem => ({
    type: "separator",
    data: { id, label, score },
  });
  const evt = (id: string, e: MockEvent): TimelineItem => ({
    type: "event",
    data: { id, ...e },
  });

  const items: TimelineItem[] = [];

  if (status === "finished") {
    items.push(sep("fulltime", "Full Time", `${homeScore} - ${awayScore}`));
  } else if (status === "live" || status === "halftime") {
    items.push(sep("current", status === "halftime" ? "Half Time" : "Live"));
  }

  items.push(
    evt("sub-home-89", {
      minute: "89'",
      type: "substitution",
      side: "home",
      playerName: "Gyokeres",
      assistOrDetail: "Ødegaard",
    }),
    evt("goal-away-88", {
      minute: "88'",
      type: "goal",
      side: "away",
      playerName: "Ekitike",
      assistOrDetail: "Salah",
      isKeyEvent: true,
    }),
    evt("yellow-home-78", {
      minute: "78'",
      type: "yellow_card",
      side: "home",
      playerName: "Saliba",
    }),
    evt("corner-home-74", {
      minute: "74'",
      type: "corner",
      side: "home",
      playerName: "3rd corner",
    }),
    evt("sub-home-67", {
      minute: "67'",
      type: "substitution",
      side: "home",
      playerName: "Rice",
      assistOrDetail: "Zubimendi",
    }),
    evt("sub-away-67", {
      minute: "67'",
      type: "substitution",
      side: "away",
      playerName: "Frimpong",
      assistOrDetail: "Robertson",
    }),
    evt("red-away-66", {
      minute: "66'",
      type: "red_card",
      side: "away",
      playerName: "Van Dijk",
      assistOrDetail: "Sent Off",
    }),
    evt("goal-home-55", {
      minute: "55'",
      type: "goal",
      side: "home",
      playerName: "Saka",
      isKeyEvent: true,
    }),
    evt("corner-home-52", {
      minute: "52'",
      type: "corner",
      side: "home",
      playerName: "5th corner",
    }),
    evt("corner-away-48", {
      minute: "48'",
      type: "corner",
      side: "away",
      playerName: "3rd corner",
    }),
  );

  items.push(sep("halftime", "Half Time", "1 - 0"));

  items.push(
    evt("corner-home-45", {
      minute: "45+2'",
      type: "corner",
      side: "home",
      playerName: "2nd corner",
    }),
    evt("sub-away-45", {
      minute: "45'",
      type: "substitution",
      side: "away",
      playerName: "Jones",
      assistOrDetail: "McAllister",
    }),
    evt("yellow-home-44", {
      minute: "44'",
      type: "yellow_card",
      side: "home",
      playerName: "Gabriel",
    }),
    evt("injury-away-44", {
      minute: "44'",
      type: "injury",
      side: "away",
      playerName: "Jones",
      assistOrDetail: "Injured",
    }),
    evt("corner-home-36", {
      minute: "36'",
      type: "corner",
      side: "home",
      playerName: "1st corner",
    }),
    evt("yellow-away-34", {
      minute: "34'",
      type: "yellow_card",
      side: "away",
      playerName: "Konaté",
    }),
    evt("var-home-25", {
      minute: "25'",
      type: "var",
      side: "home",
      playerName: "Gyokeres",
    }),
    evt("corner-away-16", {
      minute: "16'",
      type: "corner",
      side: "away",
      playerName: "2nd corner",
    }),
    evt("goal-home-12", {
      minute: "12'",
      type: "goal",
      side: "home",
      playerName: "Gyokeres",
      assistOrDetail: "Ødegaard",
      isKeyEvent: true,
    }),
    evt("corner-away-3", {
      minute: "3'",
      type: "corner",
      side: "away",
      playerName: "1st corner",
    }),
  );

  items.push(sep("kickoff", `Kick Off - ${timeDisplay}`));

  return items;
}


type DualEvent = {
  type: "dual_event";
  data: [TimelineEvent, TimelineEvent];
  minute: string;
};
type GroupedItem = TimelineItem | DualEvent;

export function groupTimelineItems(items: TimelineItem[]): GroupedItem[] {
  const result: GroupedItem[] = [];
  for (let i = 0; i < items.length; i++) {
    const curr = items[i];
    const next = items[i + 1];
    if (
      curr.type === "event" &&
      next?.type === "event" &&
      next.data.minute === curr.data.minute &&
      next.data.side !== curr.data.side
    ) {
      const [home, away] =
        curr.data.side === "home"
          ? [curr.data, next.data]
          : [next.data, curr.data];
      result.push({
        type: "dual_event",
        data: [home, away],
        minute: curr.data.minute,
      });
      i++;
    } else {
      result.push(curr);
    }
  }
  return result;
}