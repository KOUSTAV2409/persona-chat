"use client";

import { PanelLeft, PenSquare } from "lucide-react";
import { Persona, PERSONAS, PERSONA_META, cn } from "@/lib/utils";

export function ChatSidebar({
  persona,
  onPersonaChange,
  onNewChat,
  open,
  onToggle,
}: {
  persona: Persona;
  onPersonaChange: (p: Persona) => void;
  onNewChat: () => void;
  open: boolean;
  onToggle: () => void;
}) {
  if (!open) {
    return (
      <div className="flex w-14 shrink-0 flex-col items-center border-r border-sidebar-border bg-sidebar py-3">
        <button
          onClick={onToggle}
          className="rounded-lg p-2 text-sidebar-foreground hover:bg-sidebar-accent"
          aria-label="Open sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center justify-between p-2">
        <span className="px-2 text-sm font-semibold">Persona Chat</span>
        <button
          onClick={onToggle}
          className="rounded-lg p-2 hover:bg-sidebar-accent"
          aria-label="Close sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="px-2 pb-2">
        <button
          onClick={onNewChat}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-sidebar-accent"
        >
          <PenSquare className="h-4 w-4" />
          New chat
        </button>
      </div>

      <div className="px-4 pb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Mentors
      </div>

      <div className="flex-1 space-y-0.5 overflow-y-auto px-2">
        {PERSONAS.map((p) => {
          const meta = PERSONA_META[p];
          const active = p === persona;
          return (
            <button
              key={p}
              onClick={() => onPersonaChange(p)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                active ? "bg-sidebar-accent text-foreground" : "hover:bg-sidebar-accent/60"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
                  meta.color
                )}
              >
                {meta.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium">{p}</p>
                <p className="truncate text-xs text-muted-foreground">{meta.tagline}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-sidebar-border p-3 text-[11px] leading-relaxed text-muted-foreground">
        AI simulation for learning. Not affiliated with the real creators.
      </div>
    </aside>
  );
}
