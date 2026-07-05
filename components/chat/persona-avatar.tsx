"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Persona, PERSONA_META, cn } from "@/lib/utils";

export function PersonaAvatar({
  persona,
  size = "md",
  className,
}: {
  persona: Persona;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const meta = PERSONA_META[persona];
  const sizeClass =
    size === "sm" ? "h-7 w-7" : size === "lg" ? "h-10 w-10" : "h-8 w-8";

  return (
    <Avatar className={cn(sizeClass, "shrink-0 border border-border", className)}>
      <AvatarImage src={meta.avatar} alt={persona} />
      <AvatarFallback className={cn("text-xs font-semibold text-white", meta.color)}>
        {meta.initials}
      </AvatarFallback>
    </Avatar>
  );
}
