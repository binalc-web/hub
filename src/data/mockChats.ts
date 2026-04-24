export type ChatMessage = {
  id: string;
  body: string;
  sentAt: string; // ISO
  isSelf: boolean;
};

export type ChatThread = {
  id: string;
  title: string;
  lastPreview: string;
  lastAt: string; // ISO
  messages: ChatMessage[];
};

function msg(
  id: string,
  body: string,
  sentAt: string,
  isSelf: boolean
): ChatMessage {
  return { id, body, sentAt, isSelf };
}

/** Seed data for the chat dashboard. */
export const initialThreads: ChatThread[] = [
  {
    id: "t1",
    title: "Design sync",
    lastPreview: "Can we move the review to Friday?",
    lastAt: "2026-04-24T14:20:00.000Z",
    messages: [
      msg("m1", "Morning — draft is in the shared folder.", "2026-04-24T13:00:00.000Z", false),
      msg("m2", "Thanks, I'll review this afternoon.", "2026-04-24T13:05:00.000Z", true),
      msg("m3", "Can we move the review to Friday?", "2026-04-24T14:20:00.000Z", false),
    ],
  },
  {
    id: "t2",
    title: "Alex Kumar",
    lastPreview: "Shipped the patch to staging.",
    lastAt: "2026-04-23T18:30:00.000Z",
    messages: [
      msg("m4", "Did you get a chance to look at the logs?", "2026-04-23T17:00:00.000Z", true),
      msg("m5", "Yes — the timeout was on the client. Shipped the patch to staging.", "2026-04-23T18:30:00.000Z", false),
    ],
  },
  {
    id: "t3",
    title: "Team announcements",
    lastPreview: "Reminder: roadmap chat Thursday 10:00.",
    lastAt: "2026-04-22T09:00:00.000Z",
    messages: [
      msg("m6", "Welcome to the #announcements channel.", "2026-04-20T10:00:00.000Z", false),
      msg("m7", "Reminder: roadmap chat Thursday 10:00.", "2026-04-22T09:00:00.000Z", false),
    ],
  },
];

export function shortTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
