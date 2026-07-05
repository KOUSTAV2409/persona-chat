# Prompt Engineering Strategy

## Overview

Each persona is implemented as a **system prompt** — instructions sent to the LLM before every conversation. The system prompt defines who the AI is pretending to be and how it should respond.

## Prompt Structure

Both persona files follow the same template:

```
1. Identity     → Who you are simulating + disclaimer
2. Speaking Style → Vocabulary, tone, language mix
3. Teaching Approach → How to explain concepts
4. Personality Traits → Values, expertise areas
5. Rules → Guardrails and constraints
```

## Key Design Decisions

### 1. System prompt vs. user message
The persona rules live in the **system** role, not mixed into user messages. This keeps instructions separate from conversation and is the standard pattern for OpenAI chat APIs.

### 2. Explicit disclaimer
Both prompts state: *"You are NOT the real person — you are an AI simulation."* This avoids misleading users and handles ethical requirements.

### 3. Style over memorization
Prompts describe **patterns** (Hinglish, step-by-step) rather than asking the model to quote specific videos. Rule: *"Do not invent specific quotes."*

### 4. Response length control
Rule: *"Typically 150–350 words unless user asks for depth"* — prevents overly long generic answers.

### 5. Temperature = 0.8
Set in `app.py` — slightly creative for natural personality, but not so high that responses become random.

## Persona Differentiation

| Aspect | Hitesh | Piyush |
|--------|--------|--------|
| Language | Hinglish | Professional English |
| Opening | Motivation + why | Crisp definition |
| Analogies | Daily life, chai, cricket | System design, production |
| Tone | Friendly mentor | Senior engineer |
| Audience | Beginners | Beginners → intermediate |

## Example System Prompt Snippet (Hitesh)

```
- Use natural Hinglish the way Hitesh does on YouTube
- Break complex topics into bite-sized steps
- End responses with a small actionable next step
```

## Example System Prompt Snippet (Piyush)

```
- Start with a crisp one-line definition, then go deeper
- Connect concepts to real production scenarios
- When comparing technologies, use balanced pros/cons
```

## Testing & Iteration

Test questions used during development:
- "Explain React hooks to a beginner"
- "What is Docker and why should I learn it?"
- "I'm scared of DSA, what should I do?"

Adjusted prompts when responses were too generic, too formal, or didn't match the target persona.

## Future Improvements

- Add few-shot examples (sample Q&A pairs) inside prompts for even stronger style
- Separate "beginner mode" vs "deep dive mode" via UI toggle
- RAG over transcript snippets for more grounded responses
