"use client";

import { motion } from "framer-motion";
import { Persona, SUGGESTIONS } from "@/lib/utils";

export function SuggestedActions({
  persona,
  onSelect,
}: {
  persona: Persona;
  onSelect: (text: string) => void;
}) {
  const actions = SUGGESTIONS[persona];

  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-2 px-4 pb-4 sm:grid-cols-3">
      {actions.map((item, index) => (
        <motion.button
          key={item.action}
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 * index, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onSelect(item.action)}
          className="rounded-xl border border-border bg-muted/40 p-3 text-left transition-colors hover:bg-muted"
        >
          <span className="block text-sm font-medium">{item.title}</span>
          <span className="block text-xs text-muted-foreground">{item.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
