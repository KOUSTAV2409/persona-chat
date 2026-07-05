"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Send,
  SquarePen,
} from "lucide-react";
import {
  ChatMessage,
  PERSONA_META,
  PERSONAS,
  Persona,
  SUGGESTIONS,
  cn,
} from "@/lib/utils";

function PersonaIcon({ persona, size = "md" }: { persona: Persona; size?: "sm" | "md" | "lg" }) {
  const meta = PERSONA_META[persona];
  const sizeClass = size === "sm" ? "h-7 w-7 text-xs" : size === "lg" ? "h-10 w-10 text-sm" : "h-8 w-8 text-xs";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        meta.color,
        sizeClass
      )}
    >
      {meta.initials}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1" role="status" aria-label="Loading">
      <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
      <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
      <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
    </div>
  );
}

function MessageRow({
  message,
  persona,
}: {
  message: ChatMessage;
  persona: Persona;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="bg-user-msg">
        <div className="mx-auto flex max-w-3xl gap-4 px-4 py-6 md:px-6">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5436DA] text-xs font-semibold text-white">
            You
          </div>
          <div className="min-w-0 flex-1 pt-0.5 text-[0.9375rem] leading-7 whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border/50">
      <div className="mx-auto flex max-w-3xl gap-4 px-4 py-6 md:px-6">
        <PersonaIcon persona={persona} />
        <div className="chat-markdown min-w-0 flex-1 pt-0.5">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export function ChatApp() {
  const [persona, setPersona] = useState<Persona>("Hitesh Choudhary");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const meta = PERSONA_META[persona];
  const suggestions = SUGGESTIONS[persona];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [input]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ persona, messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `**Error:** ${err instanceof Error ? err.message : "Something went wrong"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function selectPersona(p: Persona) {
    if (p === persona) return;
    setPersona(p);
    setMessages([]);
  }

  function newChat() {
    setMessages([]);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar — ChatGPT style */}
      <aside
        className={cn(
          "flex shrink-0 flex-col bg-sidebar transition-all duration-200",
          sidebarOpen ? "w-[260px]" : "w-0 overflow-hidden"
        )}
      >
        <div className="flex flex-col gap-2 p-2">
          <button
            onClick={newChat}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-surface"
          >
            <SquarePen className="h-4 w-4" />
            New chat
          </button>
        </div>

        <div className="px-3 pb-2">
          <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Mentors
          </p>
        </div>

        <div className="flex-1 space-y-0.5 overflow-y-auto px-2">
          {PERSONAS.map((p) => (
            <button
              key={p}
              onClick={() => selectPersona(p)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                persona === p
                  ? "bg-surface text-foreground"
                  : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
              )}
            >
              <PersonaIcon persona={p} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.split(" ")[0]}</p>
                <p className="truncate text-xs text-muted-foreground">{PERSONA_META[p].tagline}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-border p-3">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            AI simulation for learning. Not the real creators.
          </p>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2">
            <PersonaIcon persona={persona} size="sm" />
            <span className="text-sm font-medium">{persona}</span>
          </div>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {messages.length === 0 && !loading ? (
            <div className="flex h-full flex-col items-center justify-center px-4 pb-32">
              <PersonaIcon persona={persona} size="lg" />
              <h2 className="mt-6 text-2xl font-semibold">{meta.greeting}</h2>
              <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
                {meta.description}
              </p>
              <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-3">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => void sendMessage(s)}
                    className="rounded-xl border border-border bg-surface/50 px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-surface"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <MessageRow key={i} message={msg} persona={persona} />
              ))}
              {loading && (
                <div className="border-b border-border/50">
                  <div className="mx-auto flex max-w-3xl gap-4 px-4 py-6 md:px-6">
                    <PersonaIcon persona={persona} />
                    <TypingIndicator />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Composer — ChatGPT pill input */}
        <div className="shrink-0 bg-background px-4 pb-4 pt-2">
          <div className="mx-auto max-w-3xl">
            <div className="relative flex items-end rounded-[26px] border border-border bg-input shadow-sm">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${persona.split(" ")[0]}...`}
                rows={1}
                disabled={loading}
                className="max-h-[200px] min-h-[52px] flex-1 resize-none bg-transparent py-3.5 pl-4 pr-12 text-[0.9375rem] outline-none placeholder:text-muted-foreground disabled:opacity-50"
              />
              <button
                onClick={() => void sendMessage()}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className={cn(
                  "absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                  input.trim() && !loading
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-surface text-muted-foreground cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Persona Chat can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
