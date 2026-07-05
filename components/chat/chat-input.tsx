"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function ChatInput({
  input,
  setInput,
  onSubmit,
  loading,
  placeholder,
}: {
  input: string;
  setInput: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
  placeholder: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [input]);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="relative flex items-end rounded-2xl border border-border bg-muted/30 shadow-sm focus-within:border-ring/50 focus-within:ring-1 focus-within:ring-ring/20">
        <Textarea
          ref={ref}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!loading && input.trim()) onSubmit();
            }
          }}
          placeholder={placeholder}
          disabled={loading}
          rows={1}
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent py-3.5 pl-4 pr-14 shadow-none focus-visible:ring-0"
        />
        <Button
          type="button"
          size="icon"
          disabled={loading || !input.trim()}
          onClick={onSubmit}
          aria-label="Send message"
          className={cn(
            "absolute bottom-2 right-2 h-8 w-8 rounded-full",
            input.trim() && !loading
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground"
          )}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
