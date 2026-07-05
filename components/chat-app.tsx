"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, MessageSquarePlus, Send, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message";
import { MessageScroller } from "@/components/ui/message-scroller";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ChatMessage,
  PERSONA_META,
  PERSONAS,
  Persona,
} from "@/lib/utils";

const SUGGESTIONS = [
  "Explain React hooks like I'm a beginner",
  "What is Docker and why should I learn it?",
  "How do I prepare for DSA interviews?",
];

function groupMessages(messages: ChatMessage[]) {
  const groups: { role: ChatMessage["role"]; items: ChatMessage[] }[] = [];
  for (const msg of messages) {
    const last = groups[groups.length - 1];
    if (last?.role === msg.role) {
      last.items.push(msg);
    } else {
      groups.push({ role: msg.role, items: [msg] });
    }
  }
  return groups;
}

function MarkdownBubble({ content }: { content: string }) {
  return (
    <Bubble className="border border-border/60 bg-card/80 shadow-sm">
      <BubbleContent className="prose prose-sm prose-invert max-w-none prose-p:my-2 prose-pre:my-2 prose-pre:rounded-lg prose-pre:bg-background/80 prose-pre:p-3">
        <ReactMarkdown>{content}</ReactMarkdown>
      </BubbleContent>
    </Bubble>
  );
}

export function ChatApp() {
  const [persona, setPersona] = useState<Persona>("Hitesh Choudhary");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const meta = PERSONA_META[persona];
  const firstName = persona.split(" ")[0];

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
          content: `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handlePersonaChange(value: Persona) {
    setPersona(value);
    setMessages([]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">Persona Chat</h1>
              <p className="text-xs text-muted-foreground">AI mentors · Hitesh & Piyush</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setMessages([])}>
            <MessageSquarePlus className="h-4 w-4" />
            New chat
          </Button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 p-4 lg:flex-row lg:py-6">
        <aside className="lg:w-72 lg:shrink-0">
          <Card className="sticky top-4 border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Choose mentor</CardTitle>
              <CardDescription>Same question, different teaching style.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className={`rounded-xl bg-gradient-to-br ${meta.accent} p-px`}>
                <div className="rounded-[11px] bg-card p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`bg-gradient-to-br ${meta.accent} text-white`}>
                        {meta.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium leading-none">{persona}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{meta.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{meta.description}</p>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed text-muted-foreground">
                AI simulation for learning. Not affiliated with the real creators.
              </p>
            </CardContent>
          </Card>
        </aside>

        <main className="flex min-h-[calc(100vh-8rem)] flex-1 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/30 shadow-sm">
          <div className="border-b px-5 py-4">
            <p className="font-medium">{persona}</p>
            <p className="text-sm text-muted-foreground">{meta.tagline}</p>
          </div>

          <MessageScroller>
            {messages.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className={`bg-gradient-to-br ${meta.accent} text-lg text-white`}>
                    {meta.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p className="text-lg font-medium">Chat with {firstName}</p>
                  <p className="max-w-md text-sm text-muted-foreground">
                    Ask about programming, career advice, or tech concepts — responses match{" "}
                    {firstName}&apos;s teaching style.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <Button
                      key={s}
                      variant="outline"
                      size="sm"
                      className="h-auto whitespace-normal px-3 py-2 text-left text-xs"
                      onClick={() => void sendMessage(s)}
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {groupMessages(messages).map((group, gi) => {
              const isUser = group.role === "user";
              const align = isUser ? "end" : "start";

              return (
                <MessageGroup key={gi}>
                  {group.items.map((msg, mi) => {
                    const isLastInGroup = mi === group.items.length - 1;
                    const showAvatar = !isUser && isLastInGroup;

                    return (
                      <Message key={`${gi}-${mi}`} align={align}>
                        {!isUser && (
                          <MessageAvatar className={showAvatar ? "" : "invisible w-8"}>
                            {showAvatar ? (
                              <Avatar className="h-8 w-8">
                                <AvatarFallback
                                  className={`text-xs bg-gradient-to-br ${meta.accent} text-white`}
                                >
                                  {meta.initials}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-8 w-8" />
                            )}
                          </MessageAvatar>
                        )}

                        <MessageContent>
                          {!isUser && mi === 0 && (
                            <MessageHeader>{persona}</MessageHeader>
                          )}
                          {isUser && mi === 0 && <MessageHeader>You</MessageHeader>}

                          {isUser ? (
                            <Bubble variant="primary" className="shadow-sm">
                              <BubbleContent>{msg.content}</BubbleContent>
                            </Bubble>
                          ) : (
                            <MarkdownBubble content={msg.content} />
                          )}

                          {isLastInGroup && !isUser && (
                            <MessageFooter>{firstName} · AI simulation</MessageFooter>
                          )}
                          {isLastInGroup && isUser && <MessageFooter>Sent</MessageFooter>}
                        </MessageContent>
                      </Message>
                    );
                  })}
                </MessageGroup>
              );
            })}

            {loading && (
              <Message align="start">
                <MessageAvatar>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={`text-xs bg-gradient-to-br ${meta.accent} text-white`}>
                      {meta.initials}
                    </AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader>{persona}</MessageHeader>
                  <Bubble className="border border-border/60 bg-muted/50">
                    <BubbleContent>
                      <div className="flex items-center gap-2 text-muted-foreground" role="status">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">{firstName} is typing...</span>
                      </div>
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            )}
          </MessageScroller>

          <div className="border-t bg-card/50 p-4">
            <div className="mx-auto flex max-w-3xl gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message ${firstName}...`}
                rows={1}
                disabled={loading}
                className="min-h-[52px] max-h-40"
              />
              <Button
                size="icon"
                className="h-[52px] w-[52px] shrink-0 rounded-xl"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                onClick={() => void sendMessage()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-muted-foreground">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
