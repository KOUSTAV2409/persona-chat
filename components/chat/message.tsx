"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatMessage, Persona, PERSONA_META, cn } from "@/lib/utils";

export function ChatMessageRow({
  message,
  persona,
}: {
  message: ChatMessage;
  persona: Persona;
}) {
  const isUser = message.role === "user";
  const meta = PERSONA_META[persona];

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group w-full",
        isUser ? "bg-muted/30" : "bg-background"
      )}
    >
      <div className="mx-auto flex w-full max-w-3xl gap-4 px-4 py-6 md:px-6">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border",
            isUser ? "bg-background" : meta.color
          )}
        >
          {isUser ? (
            <User className="h-4 w-4 text-muted-foreground" />
          ) : (
            <span className="text-xs font-semibold text-white">{meta.initials}</span>
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          {isUser ? (
            <p className="whitespace-pre-wrap text-[0.9375rem] leading-7">{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-7 prose-pre:bg-muted prose-pre:border prose-pre:border-border">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ThinkingRow({ persona }: { persona: Persona }) {
  const meta = PERSONA_META[persona];
  return (
    <div className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-3xl gap-4 px-4 py-6 md:px-6">
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", meta.color)}>
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex items-center gap-1 pt-2" role="status" aria-label="Loading">
          <span className="thinking-dot h-2 w-2 rounded-full bg-muted-foreground" />
          <span className="thinking-dot h-2 w-2 rounded-full bg-muted-foreground" />
          <span className="thinking-dot h-2 w-2 rounded-full bg-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
