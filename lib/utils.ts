import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Persona = "Hitesh Choudhary" | "Piyush Garg";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export const PERSONAS: Persona[] = ["Hitesh Choudhary", "Piyush Garg"];

export const PERSONA_META: Record<
  Persona,
  { tagline: string; description: string; initials: string; accent: string }
> = {
  "Hitesh Choudhary": {
    tagline: "Hinglish mentor · step-by-step · motivational",
    description:
      "Practical educator inspired by Chai aur Code. Friendly Hinglish, analogies, beginner-first.",
    initials: "HC",
    accent: "from-orange-500 to-amber-400",
  },
  "Piyush Garg": {
    tagline: "Technical deep-dives · system design · production focus",
    description:
      "Engineering educator inspired by piyushgarg.dev. Structured, precise, real-world context.",
    initials: "PG",
    accent: "from-violet-500 to-indigo-400",
  },
};
