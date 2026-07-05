"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, MessageSquarePlus, Send, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Message,
  PERSONA_META,
  PERSONAS,
  Persona,
} from "@/lib/utils";

export function ChatApp() {
  const [persona, setPersona] = useState<Persona>("Hitesh Choudhary");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const meta = PERSONA_META[persona];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
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
        { role: "assistant", content: `Error: ${err instanceof Error ? err.message : "Unknown error"}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handlePersonaChange(value: Persona) {
    setPersona(value);
    setMessages([]);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
        <aside className="lg:w-80 lg:shrink-0">
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2 text-violet-300">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">Persona Chat</span>
              </div>
              <CardTitle className="text-2xl">Learn from AI mentors</CardTitle>
              <CardDescription>
                Chat with simulations of Hitesh Choudhary or Piyush Garg — same topic, different teaching styles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Choose mentor
                </label>
                <Select value={persona} onValueChange={(v) => handlePersonaChange(v as Persona)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PERSONAS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className={`rounded-xl bg-gradient-to-br ${meta.accent} p-[1px]`}>
                <div className="rounded-xl bg-slate-950/90 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{meta.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{persona}</p>
                      <p className="text-xs text-muted-foreground">{meta.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{meta.description}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => setMessages([])}>
                <MessageSquarePlus className="h-4 w-4" />
                New chat
              </Button>

              <p className="text-xs text-muted-foreground">
                AI simulation for learning. Not affiliated with the real creators.
              </p>
            </CardContent>
          </Card>
        </aside>

        <main className="flex min-h-[70vh] flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="text-lg font-semibold">{persona}</h2>
            <p className="text-sm text-muted-foreground">{meta.tagline}</p>
          </div>

          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4 pb-4">
              {messages.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-muted-foreground">
                  <p className="mb-2 text-base font-medium text-foreground">Start a conversation</p>
                  <p className="text-sm">Try: &quot;Explain React hooks&quot; or &quot;What is Docker?&quot;</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="mt-1 h-8 w-8">
                      <AvatarFallback className="text-xs">{meta.initials}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-violet-600 text-white"
                        : "border border-white/10 bg-slate-900/80 prose prose-invert prose-sm max-w-none"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {persona.split(" ")[0]} is thinking...
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <form onSubmit={sendMessage} className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${persona.split(" ")[0]} something...`}
                className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm outline-none ring-violet-500 focus:ring-2"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()} size="lg">
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
