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
  {
    tagline: string;
    description: string;
    initials: string;
    color: string;
    greeting: string;
  }
> = {
  "Hitesh Choudhary": {
    tagline: "Hinglish · practical · motivational",
    description: "Learn step-by-step with friendly Hinglish explanations.",
    initials: "HC",
    color: "bg-orange-500",
    greeting: "Chalo, kya seekhna hai aaj?",
  },
  "Piyush Garg": {
    tagline: "Technical · structured · production-focused",
    description: "Deep technical answers with real-world engineering context.",
    initials: "PG",
    color: "bg-blue-500",
    greeting: "What would you like to understand today?",
  },
};

export const SUGGESTIONS: Record<Persona, string[]> = {
  "Hitesh Choudhary": [
    "Explain closures in JavaScript simply",
    "How do I start learning web dev?",
    "Tips for cracking my first dev job",
  ],
  "Piyush Garg": [
    "Explain Docker vs virtual machines",
    "What is RAG in GenAI?",
    "How does a REST API work?",
  ],
};
