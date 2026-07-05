"use client";

import { useEffect, useRef, useState } from "react";
import { ChatInput } from "@/components/chat/chat-input";
import { Greeting } from "@/components/chat/greeting";
import { ChatMessageRow, ThinkingRow } from "@/components/chat/message";
import { ChatSidebar } from "@/components/chat/sidebar";
import { SuggestedActions } from "@/components/chat/suggested-actions";
import {
  ChatMessage,
  PERSONA_META,
  Persona,
} from "@/lib/utils";

export function ChatApp() {
  const [persona, setPersona] = useState<Persona>("Hitesh Choudhary");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const meta = PERSONA_META[persona];
  const firstName = persona.split(" ")[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

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

  function handlePersonaChange(p: Persona) {
    if (p === persona) return;
    setPersona(p);
    setMessages([]);
    setInput("");
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      <ChatSidebar
        persona={persona}
        onPersonaChange={handlePersonaChange}
        onNewChat={() => {
          setMessages([]);
          setInput("");
        }}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header — like Vercel chatbot */}
        <header className="flex h-12 shrink-0 items-center border-b border-border px-4">
          <span className="text-sm font-medium">{persona}</span>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{meta.tagline}</span>
        </header>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          {messages.length === 0 && !loading && (
            <Greeting title={meta.greeting} subtitle={meta.description} />
          )}

          {messages.map((msg, i) => (
            <ChatMessageRow key={i} message={msg} persona={persona} />
          ))}

          {loading && <ThinkingRow persona={persona} />}
        </div>

        {/* Composer — pinned bottom like Vercel/Gemini templates */}
        <div className="shrink-0 border-t border-border bg-background px-4 pb-4 pt-3">
          {messages.length === 0 && !loading && (
            <SuggestedActions persona={persona} onSelect={(t) => void sendMessage(t)} />
          )}
          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={() => void sendMessage()}
            loading={loading}
            placeholder={`Message ${firstName}...`}
          />
          <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
            Persona Chat can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
