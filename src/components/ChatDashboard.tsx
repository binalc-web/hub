import { useMemo, useState } from "react";
import {
  type ChatMessage,
  type ChatThread,
  initialThreads,
  shortTime,
} from "../data/mockChats";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function cloneThreads(threads: ChatThread[]): ChatThread[] {
  return threads.map((t) => ({
    ...t,
    messages: t.messages.map((m) => ({ ...m })),
  }));
}

export function ChatDashboard() {
  const [threads, setThreads] = useState<ChatThread[]>(() =>
    cloneThreads(initialThreads)
  );
  const [activeId, setActiveId] = useState(threads[0]?.id ?? "");
  const [draft, setDraft] = useState("");

  const active = useMemo(
    () => threads.find((t) => t.id === activeId) ?? null,
    [threads, activeId]
  );

  const send = () => {
    const text = draft.trim();
    if (!text || !active) return;
    const now = new Date().toISOString();
    const newMessage: ChatMessage = {
      id: `local-${Date.now()}`,
      body: text,
      sentAt: now,
      isSelf: true,
    };
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== active.id) return t;
        return {
          ...t,
          lastPreview: text,
          lastAt: now,
          messages: [...t.messages, newMessage],
        };
      })
    );
    setDraft("");
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <header className="shrink-0 border-b border-border px-4 py-3">
        <h1 className="text-sm font-medium tracking-tight">Chats</h1>
      </header>
      <div className="flex min-h-0 flex-1">
        <aside
          className="w-64 shrink-0 border-r border-border bg-muted/30"
          aria-label="Conversations"
        >
          <ul className="max-h-full overflow-y-auto p-1">
            {threads.map((t) => {
              const selected = t.id === activeId;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={[
                      "w-full rounded-md px-2 py-2 text-left text-sm transition-colors",
                      selected
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-muted/80",
                    ].join(" ")}
                  >
                    <div className="truncate font-medium">{t.title}</div>
                    <div className="mt-0.5 flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="truncate">{t.lastPreview}</span>
                      <span className="shrink-0 tabular-nums">
                        {shortTime(t.lastAt)}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          {active ? (
            <>
              <div className="shrink-0 border-b border-border px-4 py-2">
                <h2 className="text-sm font-medium">{active.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {active.messages.length} message
                  {active.messages.length === 1 ? "" : "s"}
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
                <div className="mx-auto flex max-w-2xl flex-col gap-2">
                  {active.messages.map((m) => (
                    <div
                      key={m.id}
                      className={[
                        "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                        m.isSelf
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "mr-auto border border-border bg-card text-card-foreground",
                      ].join(" ")}
                    >
                      <p className="whitespace-pre-wrap break-words">{m.body}</p>
                      <p
                        className={[
                          "mt-1 text-xs",
                          m.isSelf
                            ? "text-primary-foreground/80"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {shortTime(m.sentAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 border-t border-border p-3">
                <form
                  className="mx-auto flex max-w-2xl gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                >
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Message…"
                    className="min-w-0 flex-1"
                    autoComplete="off"
                    aria-label="Message text"
                  />
                  <Button type="submit" disabled={!draft.trim()}>
                    Send
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              Select a conversation
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ChatDashboard;
