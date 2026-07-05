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
    description: "Friendly step-by-step teaching inspired by Chai aur Code.",
    initials: "HC",
    color: "bg-orange-500",
    greeting: "What can I help you learn today?",
  },
  "Piyush Garg": {
    tagline: "Technical · structured · production-focused",
    description: "Deep technical answers with real engineering context.",
    initials: "PG",
    color: "bg-blue-500",
    greeting: "What would you like to understand?",
  },
};

export const SUGGESTIONS: Record<
  Persona,
  { title: string; label: string; action: string }[]
> = {
  "Hitesh Choudhary": [
    {
      title: "Explain closures",
      label: "in JavaScript simply",
      action: "Explain closures in JavaScript simply for a beginner",
    },
    {
      title: "Start web dev",
      label: "from absolute zero",
      action: "How should I start learning web development from zero?",
    },
    {
      title: "First dev job",
      label: "tips for tier-3 college",
      action: "Tips to get my first developer job from a tier-3 college",
    },
  ],
  "Piyush Garg": [
    {
      title: "Explain Docker",
      label: "vs virtual machines",
      action: "Explain Docker vs virtual machines with pros and cons",
    },
    {
      title: "What is RAG",
      label: "in GenAI systems?",
      action: "What is RAG in GenAI and how does it work?",
    },
    {
      title: "REST API basics",
      label: "for backend interviews",
      action: "Explain REST API basics for backend interviews",
    },
  ],
};
