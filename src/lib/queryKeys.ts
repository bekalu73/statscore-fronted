export const queryKeys = {
  fixtures: "fixtures",
  match: "match",
} as const;

export const URL = {
  fixtures: (date: string) => `/eventsday.php?d=${date}&s=Soccer`,
  match: (id: string) => `/lookupevent.php?id=${id}`,
} as const;
